"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.split('/')[1] === 'png' ||
        file.mimetype.split('/')[1] === 'jpg' ||
        file.mimetype.split('/')[1] === 'jpeg') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
exports.upload = (0, multer_1.default)({ storage: storage, fileFilter });
