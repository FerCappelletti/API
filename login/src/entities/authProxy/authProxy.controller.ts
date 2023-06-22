import { createProxyMiddleware } from 'http-proxy-middleware';

export const proxyServer = createProxyMiddleware({
    target: '/http://localhost:3000/api/v1/users/auth/users',
    changeOrigin: true,
    ignorePath: true,
  });