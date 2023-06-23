"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = require("./utils/cors");
const config_1 = require("./config/config");
const mongoose_1 = __importDefault(require("mongoose"));
const authProxy_controllers_1 = require("./entities/authProxy/authProxy.controllers");
const logger_1 = __importDefault(require("./middlewares/logger"));
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
mongoose_1.default.connection.on('error', err => {
    console.log(err);
    process.exit();
});
app.use(express_1.default.json());
app.use(logger_1.default);
/** Ping server for health purpose */
app.get('/healthCheck', (req, res, next) => res.sendStatus(200).json({ message: 'Hey...you ping me!' }));
app.get('/:email/:token', authProxy_controllers_1.getAll);
app.get('/search/:email', authProxy_controllers_1.search);
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
