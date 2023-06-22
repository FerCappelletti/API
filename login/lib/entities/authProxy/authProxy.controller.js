"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = exports.getAll = void 0;
const user_model_1 = __importDefault(require("../user/user.model"));
const token_1 = __importDefault(require("../../utils/token"));
const getAll = async (req, res) => {
    const user = await user_model_1.default.findOne({ email: req.body.email });
    const verifyToken = token_1.default.verifyToken(req.body.token);
    if (!user || !verifyToken) {
        res.send(400).json({ msg: 'Token expired, please login again' });
    }
    res.status(200).json(await user_model_1.default.find().limit(10));
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
