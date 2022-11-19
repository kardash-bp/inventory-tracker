"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = require("./errorHandler");
class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = errorHandler_1.HttpCode.BAD_REQUEST;
    }
}
exports.default = BadRequestError;
