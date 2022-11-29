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
exports.cloudinaryUpload = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const errorHandler_1 = require("../errors/errorHandler");
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// upload to cloudinary
const cloudinaryUpload = (filePath, presetName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let uploadedFile = yield cloudinary_1.default.v2.uploader.upload(filePath, {
            upload_preset: presetName,
        });
        if (!uploadedFile) {
            throw new errorHandler_1.AppError({
                httpCode: errorHandler_1.HttpCode.INTERNAL_SERVER_ERROR,
                description: 'File upload failed.',
            });
        }
        return uploadedFile;
    }
    catch (err) {
        throw new errorHandler_1.AppError({
            httpCode: errorHandler_1.HttpCode.INTERNAL_SERVER_ERROR,
            description: err.message,
        });
    }
});
exports.cloudinaryUpload = cloudinaryUpload;
