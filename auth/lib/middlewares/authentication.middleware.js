"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proxyServer = void 0;
const http_proxy_middleware_1 = require("http-proxy-middleware");
exports.proxyServer = (0, http_proxy_middleware_1.createProxyMiddleware)('http://localhost:3000/api/v1/users/all', {
    target: 'http://localhost:3000/api/v1/users/auth/users',
    changeOrigin: true,
    ignorePath: true,
});
