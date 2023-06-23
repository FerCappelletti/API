"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
    }
}, { timestamps: true });
UserSchema.pre('save', async function (next) {
    const hash = await bcrypt_1.default.hash(this.password, 10);
    this.password = hash;
    next();
});
UserSchema.methods.isValidPassword = async function (password) {
    return await bcrypt_1.default.compare(password, this.password);
};
exports.default = (0, mongoose_1.model)('User', UserSchema);
