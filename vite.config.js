import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig(
 {
   esbuild:{
      jsxFactory: "jsx", // указали нзв нашей фукнции
      jsxInject: "import jsx from '@/jsx.js'", // чтоб не прописывать import  в каждом jsx файлe, вытащили сюда
   }, 
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