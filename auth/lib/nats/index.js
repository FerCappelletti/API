"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_nats_streaming_1 = __importDefault(require("node-nats-streaming"));
const user_model_1 = __importDefault(require("../entities/user/user.model"));
class NatsConnector {
    constructor() {
        const { randomBytes } = require("crypto");
        const stan = node_nats_streaming_1.default.connect('api', 'auth_client' + randomBytes(6).toString('hex'), {
            url: `http://${process.env.NATS_HOST}:${process.env.NATS_PORT}`,
        });
        stan.on('connect', async () => {
            stan.subscribe('user:add').on('message', (msg) => {
                const data = JSON.parse(msg.getData());
                new user_model_1.default({ email: data.email, password: data.password }).save();
            });
        });
    }
}
exports.default = NatsConnector;
