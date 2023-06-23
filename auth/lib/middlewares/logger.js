"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = (req, res, next) => {
    console.log(`Logger: ${req.url}:${res.status}`);
    next();
};
exports.default = logger;
