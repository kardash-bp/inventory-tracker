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
exports.isAuth = exports.resetPassword = exports.contactUs = exports.forgotPassword = exports.changePassword = exports.updateUser = exports.getUsers = exports.getUser = exports.logout = exports.login = exports.register = void 0;
const cloudinary_1 = require("./../utils/cloudinary");
const node_crypto_1 = __importDefault(require("node:crypto"));
const cryptoHashString_1 = __importDefault(require("../utils/cryptoHashString"));
const errorHandler_1 = require("../errors/errorHandler");
const errorHandler_2 = require("../errors/errorHandler");
const userModel_1 = __importDefault(require("../models/userModel"));
const tokenModel_1 = __importDefault(require("../models/tokenModel"));
const asyncWrapper_1 = require("../utils/asyncWrapper");
const sendEmail_1 = require("../utils/sendEmail");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new errorHandler_2.AppError({
            name: 'required',
            httpCode: errorHandler_1.HttpCode.BAD_REQUEST,
            description: 'Please fill in all required fields.',
        });
    }
    if (password.length < 6) {
        throw new errorHandler_2.AppError({
            name: 'shortPassword',
            httpCode: errorHandler_1.HttpCode.BAD_REQUEST,
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
            httpCode: errorHandler_1.HttpCode.BAD_REQUEST,
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
    res.status(errorHandler_1.HttpCode.CREATED).json(user);
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
            httpCode: errorHandler_1.HttpCode.BAD_REQUEST,
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
    res.status(errorHandler_1.HttpCode.CREATED).json(user);
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
    req.user = undefined;
    req.authenticated = undefined;
    res.redirect('/');
};
exports.logout = logout;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    res.json(user);
});
exports.getUser = getUser;
const getUsers = (req, res) => {
    res.status(errorHandler_1.HttpCode.OK).json(res.locals.user);
};
exports.getUsers = getUsers;
exports.updateUser = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.email) {
        delete req.body.email;
    }
    console.log(req.body);
    console.log(req.file);
    const updated = Object.assign(req.user, req.body);
    let uploadedFile;
    if (req.file) {
        uploadedFile = yield (0, cloudinary_1.cloudinaryUpload)(req.file.path, 'inventracker');
    }
    updated.photo = uploadedFile === null || uploadedFile === void 0 ? void 0 : uploadedFile.secure_url;
    const id = updated._id.valueOf();
    const updatedUser = yield userModel_1.default.findByIdAndUpdate(id, updated, {
        new: true,
    });
    res.status(errorHandler_1.HttpCode.OK).json(updatedUser);
}));
exports.changePassword = (0, asyncWrapper_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { oldPassword, newPassword } = req.body;
    const user = yield userModel_1.default.findById(req.user._id);
    if (!user) {
        throw new errorHandler_2.AppError({
            httpCode: errorHandler_1.HttpCode.BAD_REQUEST,
            description: 'Please signup.',
        });
    }
    if (!oldPassword || !newPassword) {
        throw new errorHandler_2.AppError({
            httpCode: errorHandler_1.HttpCode.BAD_REQUEST,
            description: 'Please add old and new password.',
        });
    }
    if (!user.isValidPassword(oldPassword)) {
        throw new errorHandler_2.AppError({
            httpCode: errorHandler_1.HttpCode.BAD_REQUEST,
            description: 'Please enter correct password.',
        });
    }
    user.password = newPassword;
    yield user.save();
    res.status(errorHandler_1.HttpCode.OK).send('Password change successful');
}));
exports.forgotPassword = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email) {
        throw new errorHandler_2.AppError({
            httpCode: errorHandler_1.HttpCode.BAD_REQUEST,
            description: 'Please enter your email.',
        });
    }
    const user = yield userModel_1.default.findOne({ email: req.body.email });
    if (!user) {
        throw new errorHandler_2.AppError({
            httpCode: errorHandler_1.HttpCode.BAD_REQUEST,
            description: 'Please signup.',
        });
    }
    // remove token from db if exists
    yield tokenModel_1.default.deleteMany({ userId: user._id });
    // reset password token
    const resetToken = node_crypto_1.default.randomUUID() + '-' + user._id;
    const hashedToken = (0, cryptoHashString_1.default)(resetToken);
    const tokenSaved = yield tokenModel_1.default.create({
        userId: user._id,
        token: hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 1000 * 60 * 30,
    });
    const resetUrl = `${process.env.FRONT_URL}/reset/${resetToken}`;
    const message = `<h2>Hello ${user.name}</h2>,

   <p> Somebody requested a new password for the [customer portal] account associated with ${user.email}.</p>
    
    <p>No changes have been made to your account yet.</p>
    
    You can reset your password by clicking the link below:
    <a href='${resetUrl}' >Reset Password</a>
    <p>If you did not request a new password, please let us know immediately by replying to this email.</p>
    
    <p>
      Yours,
      The [company] team
    </p>`;
    const options = {
        subject: 'Password reset request',
        message: message,
        sendTo: user.email,
        sendFrom: process.env.EMAIL_USER,
    };
    try {
        yield (0, sendEmail_1.sendEmail)(options);
        res
            .status(errorHandler_1.HttpCode.OK)
            .json({ success: true, message: 'Reset Email Sent' });
    }
    catch (err) {
        console.log(err);
        throw new errorHandler_2.AppError({
            description: 'Emails fail to send.',
            httpCode: errorHandler_1.HttpCode.INTERNAL_SERVER_ERROR,
        });
    }
}));
exports.contactUs = (0, asyncWrapper_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { subject, message } = req.body;
    if (!req.authenticated) {
        throw new errorHandler_2.AppError({
            name: 'wrongCredentials',
            httpCode: errorHandler_1.HttpCode.BAD_REQUEST,
            description: 'Wrong credentials.',
        });
    }
    if (!subject || !message) {
        throw new errorHandler_2.AppError({
            name: 'required',
            httpCode: errorHandler_1.HttpCode.BAD_REQUEST,
            description: 'Please fill in all fields.',
        });
    }
    const options = {
        subject: subject,
        message: message,
        sendTo: process.env.EMAIL_TO,
        sendFrom: process.env.EMAIL_USER,
        replyTo: req.user.email,
    };
    try {
        yield (0, sendEmail_1.sendEmail)(options);
        res.status(errorHandler_1.HttpCode.OK).json({ success: true, message: 'Email Sent' });
    }
    catch (err) {
        console.log(err);
        throw new errorHandler_2.AppError({
            description: 'Emails fail to send.',
            httpCode: errorHandler_1.HttpCode.INTERNAL_SERVER_ERROR,
        });
    }
    // res.status(HttpCode.OK).send('Contact was successful')
}));
exports.resetPassword = (0, asyncWrapper_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = (0, cryptoHashString_1.default)(req.params.token);
    const { password } = req.body;
    console.log('reset:', token);
    const tokenDb = yield tokenModel_1.default.findOne({
        token,
        expiresAt: { $gt: Date.now() },
    });
    if (!tokenDb) {
        throw new errorHandler_2.AppError({
            httpCode: errorHandler_1.HttpCode.BAD_REQUEST,
            description: 'Invalid or expired token.',
        });
    }
    const id = tokenDb.userId.valueOf();
    const user = yield userModel_1.default.findOne({ _id: id });
    if (!user) {
        throw new errorHandler_2.AppError({
            httpCode: errorHandler_1.HttpCode.BAD_REQUEST,
            description: 'No user with that id.',
        });
    }
    user.password = password;
    yield user.save();
    res.status(errorHandler_1.HttpCode.OK).send('Reset Password change successful');
}));
const isAuth = (req, res) => {
    res.status(errorHandler_1.HttpCode.OK).json({ user: req.user, isAuth: req.authenticated });
};
exports.isAuth = isAuth;
