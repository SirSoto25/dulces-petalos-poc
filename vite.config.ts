import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // In dev, VITE_API_BASE_URL=/api (from .env.development), so all
      // fetch('/api/v1/...') calls hit this proxy which forwards to the real API.
      '/api': {
        target: 'https://dulces-petalos.jakala.es',
        changeOrigin: true,
        rewrite: (path) => path, // /api/v1/product → /api/v1/product (keep as-is)
      },
    },
  },
})
