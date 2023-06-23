"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../user/user.model"));
const token_1 = __importDefault(require("../../utils/token"));
class UserService {
    constructor() {
        this.user = user_model_1.default;
    }
    /**
     * Register a new user
     */
    async register(email, password) {
        try {
            const user = await this.user.create({
                email,
                password
            });
            //const accessToken = token.createToken(user);
            return user;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    /**
     * Attempt to login a user
     */
    async login(email, password) {
        try {
            const user = await this.user.findOne({ email });
            if (!user) {
                throw new Error('Unable to find user with that email address');
            }
            if (await user.isValidPassword(password)) {
                return token_1.default.createToken(user);
            }
            else {
                throw new Error('Wrong credentials given');
            }
        }
        catch (error) {
            throw new Error('Unable to create user');
        }
    }
}
exports.default = UserService;
