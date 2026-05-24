import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'unplugin-dts/vite'


export default defineConfig({
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName:()=> 'index.js'
    },
  },
  plugins: [dts({ tsconfigPath: './tsconfig-build.json'})],

})
