"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authProxy_controller_1 = require("../authProxy/authProxy.controller");
const router = express_1.default.Router();
router.get('/', authProxy_controller_1.getAll);
router.get('/user/:email', authProxy_controller_1.search);
exports.default = router;
