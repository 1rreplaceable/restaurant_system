import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: 'postcss.config.cjs', // PostCSS 설정 파일 경로 지정
  },
})
