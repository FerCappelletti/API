"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Routes
const user_routes_1 = __importDefault(require("./entities/user/user.routes"));
const authProxy_routes_1 = __importDefault(require("./entities/authProxy/authProxy.routes"));
const authentication_middleware_1 = require("./middlewares/authentication.middleware");
const router = (0, express_1.Router)();
router.use("/users", user_routes_1.default);
router.use("/auth/users", authentication_middleware_1.proxyServer, authProxy_routes_1.default);
exports.default = router;
