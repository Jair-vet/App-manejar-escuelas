import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/ 1
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[local]_[hash:base64:2]'
    }

  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  cache: false
})
