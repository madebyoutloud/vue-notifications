import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import UnoCSS from 'unocss/vite'
import packageJson from './package.json'

const name = 'VueNotifications'

export default defineConfig(({ mode }) => ({
  resolve: {
    alias: {
      '~': path.resolve(import.meta.dirname, 'src'),
    },
  },
  plugins: [
    Vue(),
    UnoCSS(),
    dts({
      tsconfigPath: path.resolve(import.meta.dirname, 'tsconfig.build.json'),
      // rollupTypes: true,
    }),
  ],
  publicDir: false,
  build: {
    lib: mode === 'lib'
      ? {
          entry: ['src/index.ts'],
          name,
          formats: ['es'],
        }
      : undefined,
    rollupOptions: {
      external: Object.keys(packageJson.peerDependencies),
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
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

  test: {
    globals: true,
    environment: 'happy-dom',
  },
}))
