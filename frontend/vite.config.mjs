import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',       // matches your Dockerfile COPY
    emptyOutDir: true     // clean previous builds
  },
  server: {
    host: true,
    port: 5173
  }
})
