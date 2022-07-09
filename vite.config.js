import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
  ],
  server:{
    port: 6655
  },
  base: "./",
  // build:{
  //   minify: 'terser',
  //   terserOptions: {
  //     compress: {
  //         //生产环境时移除console.log()
  //         drop_console: true,
  //         drop_debugger: true,
  //     },
  //   },
  // },
})
