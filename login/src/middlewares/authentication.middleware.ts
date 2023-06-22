import { createProxyMiddleware } from 'http-proxy-middleware';

export const proxyServer = createProxyMiddleware('http://localhost:3000/api/v1/users/all',{
    target: 'http://localhost:3000/api/v1/users/auth/users',
    changeOrigin: true,
    ignorePath: true,
  });