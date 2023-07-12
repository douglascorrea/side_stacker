import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 3000,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@/': '/src',
      '@/pages': '/src/pages',
      '@/components': '/src/components',
      '@/contexts': '/src/contexts',
      '@/api': '/src/api',
      '@/utils': '/src/utils',
    }
  }
})
