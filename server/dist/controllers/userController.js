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
exports.getUsers = exports.getUser = exports.logout = exports.login = exports.register = void 0;
const errorHandler_1 = require("../errors/errorHandler");
const errorHandler_2 = require("../errors/errorHandler");
const userModel_1 = __importDefault(require("../models/userModel"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new errorHandler_2.AppError({
            name: 'required',
            httpCode: 400,
            description: 'Please fill in all required fields.',
        });
    }
    if (password.length < 6) {
        throw new errorHandler_2.AppError({
            name: 'shortPassword',
            httpCode: 400,
            description: 'Password must be at least 6 characters.',
        });
    }
    // check unique email
    const userExists = yield userModel_1.default.findOne({ email });
    if (userExists) {
        throw new errorHandler_2.AppError({
            name: 'userExists',
            httpCode: 422,
            description: 'This email address is already used.',
        });
    }
    const user = yield userModel_1.default.create({ name, email, password });
    if (!user) {
        throw new errorHandler_2.AppError({
            name: 'notCreated',
            httpCode: 400,
            description: 'Account not created. Try again.',
        });
    }
    user.toJSON();
    const token = user.createToken();
    res.cookie('token', token, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: 'none',
        secure: true,
    });
    res.status(errorHandler_1.HttpCode.CREATED).json({ user });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new errorHandler_2.AppError({
            name: 'required',
            httpCode: errorHandler_1.HttpCode.BAD_REQUEST,
            description: 'Please fill in all required fields.',
        });
    }
    const user = yield userModel_1.default.findOne({ email });
    if (!user) {
        throw new errorHandler_2.AppError({
            name: 'notFound',
            httpCode: errorHandler_1.HttpCode.BAD_REQUEST,
            description: 'User not found, please register.',
        });
    }
    // const validPass = user.isValidPassword(password)
    // console.log(validPass)
    if (!user.isValidPassword(password)) {
        throw new errorHandler_2.AppError({
            name: 'wrongCredentials',
            httpCode: 400,
            description: 'Wrong credentials.',
        });
    }
    user.toJSON();
    const token = user.createToken();
    res.cookie('token', token, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: 'none',
        // secure: true,
    });
    res.status(errorHandler_1.HttpCode.OK).json(user);
});
exports.login = login;
const logout = (req, res) => {
    res.cookie('token', '', {
        path: '/',
        expires: new Date(0),
        sameSite: 'none',
        secure: process.env.NODE_ENV !== 'development',
        httpOnly: true,
    });
    res
        .status(errorHandler_1.HttpCode.OK)
        .json({ message: 'You have successfully been logged out.' });
};
exports.logout = logout;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`res.locals.user ONE: ${res.locals.user}`);
    next();
});
exports.getUser = getUser;
const getUsers = (req, res) => {
    console.log(`res.locals.user: ${res.locals.user}`);
    res.status(errorHandler_1.HttpCode.OK).json(res.locals.user);
};
exports.getUsers = getUsers;
