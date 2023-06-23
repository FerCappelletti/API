"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../user/user.model"));
const token_1 = __importDefault(require("../../utils/token"));
const register = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ msg: "Please send your email and password" });
    }
    const user = await user_model_1.default.findOne({ email });
    if (user) {
        res.send(400).json({ msg: 'User already exists' });
    }
    const newUser = new user_model_1.default(req.body);
    await newUser.save();
    return res.status(201).json(newUser);
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ msg: "Please send your email and password" });
    }
    const user = await user_model_1.default.findOne({ email });
    if (!user) {
        return res.send(400).json({ msg: 'User is not registered' });
    }
    if (await user.isValidPassword(password)) {
        const accessToken = token_1.default.createToken(user);
        return res.status(200).json({ token: accessToken });
    }
    return res.status(400).json({ msg: 'Invalid email or password' });
};
exports.login = login;
