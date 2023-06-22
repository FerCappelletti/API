"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = require("./utils/cors");
const config_1 = require("./config/config");
const api_1 = __importDefault(require("./api"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = config_1.config.PORT || 3000;
// /** Connect to MongoDB */
mongoose_1.default.connection
    .on('connected', () => {
    console.log('[DB]: connected to database');
    app.listen(config_1.config.PORT, () => {
        console.log(`[DB]: running on port ${port}`);
    });
    app.on('error', (err) => console.log(err));
})
    .on('error', (err) => console.log(err));
mongoose_1.default.connect(config_1.config.MONGODB_URL);
app.use(express_1.default.json());
/** Ping server for health purpose */
app.get('/healthCheck', (req, res, next) => res.status(200).json({ message: 'Hey...you ping me!' }));
app.use('/api/v1', api_1.default);
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
