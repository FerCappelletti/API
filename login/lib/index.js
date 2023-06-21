"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = require("./utils/cors");
const config_1 = require("./config/config");
const app = (0, express_1.default)();
const port = config_1.config.PORT || 3000;
app.use(express_1.default.json());
/** Ping server for health purpose */
app.get('/healthCheck', (req, res, next) => res.status(200).json({ message: 'Hey...you ping me!' }));
app.use((req, res, next) => {
    (0, cors_1.corsEnabledFunction)(req, res);
    next();
});
app.listen(port, () => {
    console.log(`Server running on ${port}`);
}).on('error', function (err) {
    console.log(err);
    process.exit(1);
});
module.exports = app;
