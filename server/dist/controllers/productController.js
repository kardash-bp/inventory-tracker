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
exports.updateProduct = exports.delProduct = exports.getProduct = exports.getAllProducts = exports.addProduct = void 0;
const errorHandler_1 = require("../errors/errorHandler");
const asyncWrapper_1 = require("../utils/asyncWrapper");
const productModel_1 = __importDefault(require("../models/productModel"));
const fileSizeFormatter_1 = require("../utils/fileSizeFormatter");
const cloudinary_1 = require("../utils/cloudinary");
exports.addProduct = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, sku, category, quantity, price, description } = req.body;
    if (!name || !category || !quantity || !price || !description) {
        throw new errorHandler_1.AppError({
            httpCode: errorHandler_1.HttpCode.BAD_REQUEST,
            description: 'Please make sure all fields are filled in correctly.',
        });
    }
    console.log(req.file);
    let fileData = {};
    if (req.file) {
        // upload to cloudinary
        let uploadedFile = yield (0, cloudinary_1.cloudinaryUpload)(req.file.path, 'inventracker');
        fileData = {
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: (0, fileSizeFormatter_1.fileSizeFormatter)(req.file.size, 2),
        };
    }
    console.log(fileData);
    const product = yield productModel_1.default.create({
        user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
        name,
        sku,
        category,
        quantity,
        price,
        description,
        image: fileData,
    });
    if (!product) {
        throw new errorHandler_1.AppError({
            httpCode: errorHandler_1.HttpCode.BAD_REQUEST,
            description: "Can't create a new product..",
        });
    }
    res.status(errorHandler_1.HttpCode.CREATED).json(product);
}));
exports.getAllProducts = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield productModel_1.default.find({ user: req.user._id }).sort('-createdAt');
    if (!products) {
        throw new errorHandler_1.AppError({
            httpCode: errorHandler_1.HttpCode.BAD_REQUEST,
            description: 'Not found.',
        });
    }
    res.status(errorHandler_1.HttpCode.OK).json(products);
}));
exports.getProduct = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productModel_1.default.findById(req.params.proId);
    if (!product) {
        throw new errorHandler_1.AppError({
            httpCode: errorHandler_1.HttpCode.BAD_REQUEST,
            description: 'Product not found.',
        });
    }
    console.log(product.user.toString());
    console.log(req.user._id);
    if (product.user.toString() !== req.user._id.valueOf()) {
        throw new errorHandler_1.AppError({
            httpCode: errorHandler_1.HttpCode.FORBIDDEN,
            description: 'Not authorized.',
        });
    }
    res.status(errorHandler_1.HttpCode.OK).json(product);
}));
exports.delProduct = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productModel_1.default.findById(req.params.proId);
    if (!product) {
        throw new errorHandler_1.AppError({
            httpCode: errorHandler_1.HttpCode.BAD_REQUEST,
            description: 'Product not found.',
        });
    }
    if (product.user.toString() !== req.user._id.valueOf()) {
        throw new errorHandler_1.AppError({
            httpCode: errorHandler_1.HttpCode.FORBIDDEN,
            description: 'Not authorized.',
        });
    }
    yield product.remove();
    res.status(errorHandler_1.HttpCode.OK).json({ message: 'Product successfully deleted ' });
}));
//* update product =============================================
exports.updateProduct = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prod = yield productModel_1.default.findById(req.params.proId);
    if (!prod) {
        throw new errorHandler_1.AppError({
            httpCode: errorHandler_1.HttpCode.BAD_REQUEST,
            description: 'Product not found.',
        });
    }
    if (prod.user.toString() !== req.user._id.valueOf()) {
        throw new errorHandler_1.AppError({
            httpCode: errorHandler_1.HttpCode.FORBIDDEN,
            description: 'Not authorized.',
        });
    }
    const { name, sku, category, quantity, price, description } = req.body;
    // if (!name || !category || !quantity || !price || !description) {
    //   throw new AppError({
    //     httpCode: HttpCode.BAD_REQUEST,
    //     description: 'Please make sure all fields are filled in correctly.',
    //   })
    // }
    let fileData = {};
    if (req.file) {
        // upload to cloudinary
        let uploadedFile = yield (0, cloudinary_1.cloudinaryUpload)(req.file.path, 'inventracker');
        fileData = {
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: (0, fileSizeFormatter_1.fileSizeFormatter)(req.file.size, 2),
        };
    }
    // Update product
    const updated = yield productModel_1.default.findByIdAndUpdate(req.params.proId, {
        name,
        category,
        quantity,
        price,
        description,
        image: Object.keys(fileData).length === 0 ? prod === null || prod === void 0 ? void 0 : prod.image : fileData,
    }, { new: true, runValidators: true });
    if (!updated) {
        throw new errorHandler_1.AppError({
            httpCode: errorHandler_1.HttpCode.BAD_REQUEST,
            description: "Can't create a new product..",
        });
    }
    res.status(errorHandler_1.HttpCode.OK).json(updated);
}));
