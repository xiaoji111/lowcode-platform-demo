import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    https: false,
    port: 5000,
    proxy: {
      '/pro-api': {
        target: 'https://mobile-api.bankneo.co.id',
        rewrite: (path) => path.replace(/^\/pro-api/, ''),
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env': process.env,
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    react(),
    legacy(),
  ],
  build: {
    outDir: 'build',
    terserOptions: {
      compress: {
        drop_console: true,
        passes: 100,
      },
    },
  },
});
