import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/styles/globals/_variables.scss";
          @import "@/styles/globals/_mixins.scss";
        `
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})