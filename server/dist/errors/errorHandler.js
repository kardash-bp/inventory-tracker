"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.AppError = exports.HttpCode = void 0;
var HttpCode;
(function (HttpCode) {
    HttpCode[HttpCode["OK"] = 200] = "OK";
    HttpCode[HttpCode["CREATED"] = 201] = "CREATED";
    HttpCode[HttpCode["NO_CONTENT"] = 204] = "NO_CONTENT";
    HttpCode[HttpCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpCode[HttpCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpCode[HttpCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpCode[HttpCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpCode[HttpCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HttpCode = exports.HttpCode || (exports.HttpCode = {}));
class AppError extends Error {
    constructor(args) {
        super(args.description);
        this.isOperational = true;
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = args.name || 'Error';
        this.httpCode = args.httpCode;
        if (args.isOperational !== undefined) {
            this.isOperational = args.isOperational;
        }
        Error.captureStackTrace(this);
    }
}
exports.AppError = AppError;
class ErrorHandler {
    isGuestError(error) {
        if (error instanceof AppError)
            return error.isOperational;
        return false;
    }
    handleError(error, response) {
        if (this.isGuestError(error) && response) {
            this.handleGuestError(error, response);
        }
        else {
            this.handleCriticalError(error, response);
        }
    }
    handleGuestError(error, response) {
        response.status(error.httpCode).json({ message: error.message });
    }
    handleCriticalError(error, response) {
        //console.log('critical: ->', error)
        if (response && error.name === 'CastError') {
            response.status(HttpCode.BAD_REQUEST).json({ message: error.message });
        }
        else if (response) {
            console.log(`Response critical: -> ${response.statusCode}`);
            response
                .status(HttpCode.INTERNAL_SERVER_ERROR)
                .json({ message: 'Internal server error' });
        }
        else {
            console.log('Application encountered a critical error.');
            process.exit(1);
        }
    }
}
exports.errorHandler = new ErrorHandler();
