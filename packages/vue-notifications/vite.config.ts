import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'
import dts from 'vite-plugin-dts'
import packageJson from './package.json'

const name = 'index'

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    Vue(),
    DefineOptions(),
    dts({
      tsconfigPath: 'tsconfig.dts.json',
    }),
  ],
  publicDir: false,
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name,
      fileName: format => `${name}.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', '@vueuse/core'],
      output: {
        exports: 'auto',
        globals: {
          'vue': 'Vue',
          '@vueuse/core': 'VueUse',
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `${['@import "~/styles/imports.scss"'].join(';')};`,
      },
    },
  },
  define: {
    DEV: JSON.stringify(!process.env.prod),
    NAME: JSON.stringify(packageJson.name),
    VERSION: JSON.stringify(packageJson.version),
  },
})
