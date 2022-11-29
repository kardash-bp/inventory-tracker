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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const errorHandler_1 = require("../errors/errorHandler");
const sendEmail = (options) => __awaiter(void 0, void 0, void 0, function* () {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer_1.default.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD, // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
    // send mail with defined transport object
    let info = yield transporter.sendMail({
        from: options.sendFrom,
        to: options.sendTo,
        subject: options.subject,
        html: options.message,
        replyTo: options.replyTo,
    });
    if (!info) {
        throw new errorHandler_1.AppError({
            httpCode: errorHandler_1.HttpCode.BAD_REQUEST,
            description: 'There was an issue sending an email to this user. ',
        });
    }
    console.log('Message sent: %s', info);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
});
exports.sendEmail = sendEmail;
