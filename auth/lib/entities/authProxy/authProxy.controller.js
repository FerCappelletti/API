"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = exports.getAll = void 0;
const user_model_1 = __importDefault(require("../user/user.model"));
const token_1 = __importStar(require("../../utils/token"));
const getAll = async (req, res) => {
    const { email, token } = req.params;
    const user = await user_model_1.default.findOne({ email: email });
    const verifiedToken = (0, token_1.verifyToken)(token);
    if (!user) {
        res.sendStatus(401).json({ msg: 'User is not registered' });
    }
    if (!verifiedToken) {
        res.sendStatus(401).json({ msg: 'Token expired, please login again' });
    }
    const users = await user_model_1.default.find().limit(10);
    res.sendStatus(200).json(users);
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
