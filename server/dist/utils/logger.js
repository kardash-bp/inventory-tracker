"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const logger = (req, res, next) => {
    console.log(`log: ${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
};
exports.logger = logger;
