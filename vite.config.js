import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':{target:'https://backendngo.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
    ,allowedHosts:['3ee6-2409-4053-4ecc-2f48-94e3-9aad-d343-ad6a.ngrok-free.app']
  },
  plugins: [react(),tailwindcss()],
  
})
