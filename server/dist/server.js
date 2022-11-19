"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
require("./db");
const app_1 = __importDefault(require("./app"));
const errorHandler_1 = require("./errors/errorHandler");
const notFound_1 = __importDefault(require("./errors/notFound"));
const port = process.env.PORT || 4001;
const server = http_1.default.createServer(app_1.default);
//! errors handling ==================================
// process.on('uncaughtException', function (err: Error) {
//   // Handle the error safely
//   console.log(err.message)
//   shutDownServer(server)
// })
// process.on('unhandledRejection', (reason, promise) => {
//   console.log(reason)
//   console.log(promise)
//   shutDownServer(server)
// })
app_1.default.use((err, req, res, next) => {
    console.log('Error encountered:', err.message || err);
    next(err);
});
app_1.default.use((err, req, res, next) => {
    console.log(err.isOperational);
    console.log(process.exitCode);
    errorHandler_1.errorHandler.handleError(err, res);
});
app_1.default.use(notFound_1.default);
//=============================================================
server.listen(port, () => {
    console.log(`[server]: CORS enabled server is running at https://localhost:${port}`);
});
