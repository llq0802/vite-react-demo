import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import fs from 'fs';
import tailwindcss from '@tailwindcss/vite';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    https: {
      key: fs.readFileSync('certs/localhost+3-key.pem'),
      cert: fs.readFileSync('certs/localhost+3.pem'),
    },
    proxy: {
      '/api': {
        // 匹配所有以 '/api' 开头的请求
        target: 'http://136.29.0.0:7878', // 目标服务器的基础路径
        changeOrigin: true, // 是否改变请求源头，通常为 true
        rewrite: (path) => path.replace(/^\/api/, ''), // 可选，重写请求路径
      },
    },
  },
});
