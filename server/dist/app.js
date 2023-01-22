"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = require("path");
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const productRoute_1 = __importDefault(require("./routes/productRoute"));
const notFound_1 = __importDefault(require("./errors/notFound"));
const app = (0, express_1.default)();
const errorHandler_1 = require("./errors/errorHandler");
const logger_1 = require("./utils/logger");
//import { StatusCodes } from 'http-status-codes'
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'https://inventoty-tracker.vercel.app'],
    credentials: true,
}));
app.use((0, helmet_1.default)());
app.use((0, cookie_parser_1.default)());
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(logger_1.logger);
app.use(express_1.default.static((0, path_1.join)(__dirname, 'uploads')));
app.use('/v1/users', userRoute_1.default);
app.use('/v1/products', productRoute_1.default);
app.use('/', (req, res) => {
    res.send('Home route');
});
//! errors ==========================================================
app.get('/error-page', (req, res) => {
    res.status(errorHandler_1.HttpCode.OK).send(`<h1>Error Page, Sorry.</h1>`);
});
app.use((err, req, res, next) => {
    // console.log('error name:', err.name)
    console.log('Error encountered:', err.message || err);
    next(err);
});
app.use((err, req, res, next) => {
    errorHandler_1.errorHandler.handleError(err, res);
});
app.use(notFound_1.default);
exports.default = app;
