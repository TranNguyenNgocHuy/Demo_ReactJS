import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

//Link hướng dẫn cấu hình: https://duthanhduoc.com/blog/tao-du-an-react-vite-typescript-eslint

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
