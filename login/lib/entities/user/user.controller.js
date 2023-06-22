"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = exports.getAll = exports.login = exports.register = void 0;
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
const getAll = async (req, res) => {
    res.status(400).json({ msg: 'proxy' });
    // res.status(200).json({msg: 'proxy'})
    // const user = await User.findOne({email: req.body.email})
    // const verifyToken = token.verifyToken(req.body.token)
    // !user ? res.send(400).json({msg: 'User is not registered'}) : verifyToken
    // !verifyToken ? res.send(401).json({msg: 'Token expired, please login again'}) : 
    // res.status(200).json(await User.find().limit(10))
};
exports.getAll = getAll;
const search = async (req, res) => {
    const user = await user_model_1.default.findOne({ email: req.body.email });
    const verifyToken = token_1.default.verifyToken(req.body.token);
    !user ? res.send(400).json({ msg: 'User is not registered' }) : verifyToken;
    !verifyToken ? res.send(401).json({ msg: 'Token expired, please login again' }) :
        res.status(200).json(await user_model_1.default.find({ email: {
                $regex: req.params.email,
                $options: "i"
            } }));
};
exports.search = search;
