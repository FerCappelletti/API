"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.sendStatus(200);
});
router.post('/login', user_controller_1.login);
router.post('/register', user_controller_1.register);
router.get('/all', (req, res) => {
    res.redirect('http://localhost:3000/api/v1/auth/users');
});
exports.default = router;
