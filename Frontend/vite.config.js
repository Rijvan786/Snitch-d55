import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ['react-phone-input-2'],
  },
  server:{
    proxy:{
      "/api":{
        target:"http://localhost:3000",
        changeOrigin:true,
        secure:false,
      }
    }
  }
})
