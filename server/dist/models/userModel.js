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
const mongoose_1 = require("mongoose");
const node_crypto_1 = __importDefault(require("node:crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name.'],
        minlength: 3,
        maxlength: 30,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide your name.'],
        unique: true,
        trim: true,
        match: [
            /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            'Please enter valid email.',
        ],
    },
    password: {
        type: String,
        required: [true, 'Please add a password.'],
        minlength: [6, 'Password must be at least 6 characters.'],
        maxlength: [33, 'Password too long.'],
    },
    salt: {
        type: String,
    },
    photo: {
        type: String,
        required: [true, 'Please add a photo'],
        default: 'https://i.ibb.co/4pDNDk1/avatar.png',
    },
    phone: {
        type: String,
        default: '+381xxx',
    },
    bio: {
        type: String,
        maxLength: [255, 'Bio must be less than 255 characters'],
        default: 'bio',
    },
}, {
    timestamps: true,
});
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified('password')) {
            next();
        }
        this.salt = (0, uuid_1.v4)();
        this.password = yield node_crypto_1.default
            .createHmac('sha1', this.salt)
            .update(this.password)
            .digest('hex');
        next();
    });
});
UserSchema.methods.toJSON = function () {
    delete this._doc.password;
    delete this._doc.salt;
    return this._doc;
};
UserSchema.methods.isValidPassword = function (pass) {
    const newHash = node_crypto_1.default
        .createHmac('sha1', this.salt)
        .update(pass)
        .digest('hex');
    return this.password === newHash;
};
UserSchema.methods.createToken = function () {
    return jsonwebtoken_1.default.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '24h',
    });
};
exports.default = (0, mongoose_1.model)('User', UserSchema);
