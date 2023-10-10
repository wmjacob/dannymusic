import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },

    },
  },
  // build:{
  //   rollupOptions: {
  //     output: {
  //       manualChunks(id) {
  //         if (id.includes('node_modules')) {
  //           return 'vendors';
  //         }
  //       }
  //     },
  //   },
  // },
})
