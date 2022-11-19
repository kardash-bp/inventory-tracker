"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorHandler_1 = require("../errors/errorHandler");
const userModel_1 = __importDefault(require("../models/userModel"));
const asyncWrapper_1 = require("./asyncWrapper");
exports.auth = (0, asyncWrapper_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    if (!token) {
        throw new errorHandler_1.AppError({
            name: 'unauthorized',
            httpCode: 401,
            description: 'Not authorized, please login.',
        });
    }
    const { id } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    if (!id) {
        throw new errorHandler_1.AppError({
            name: 'unauthenticated',
            httpCode: 403,
            description: 'Invalid token.',
        });
    }
    const user = yield userModel_1.default.findById(id).select('-password -salt -__v');
    if (!user) {
        res.clearCookie('token');
    }
    // user?.toJSON()
    res.locals.user = user;
    console.log(`res.locals.user: ${res.locals.user}`);
    next();
}));
