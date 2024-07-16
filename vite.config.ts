import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/app/styles/variables.module.scss";`, // Include SCSS variables globally
      },
    },
  },
  resolve: {
    alias: {
        app: "/app",
        components: "/src/components",
        assets: "/src/assets",
        store: "/src/store",
        utils: "/src/utils",
    }
}
})
