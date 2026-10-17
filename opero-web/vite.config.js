import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api/tinyfish': {
        target: 'https://agent.tinyfish.ai',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/tinyfish/, ''),
        secure: true,
      },
    },
  },
})
