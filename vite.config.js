import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig(
 {
  resolve: {
   alias: {
      "@": "/src"
   } 
  },
  plugins: [
   ViteImageOptimizer({
      png: {
         quality: 80,
      },
      jpeg: {
         quality: 80,
      },
      jpg: {
         quality: 80,
      },
      webp: {
         quality: 80,
      },
      avif: {
         quality: 70,
      },
   })
  ]
 }

)