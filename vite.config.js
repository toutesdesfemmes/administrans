import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import 'vite-ssg'
import { templates } from './src/documents'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  ssgOptions: {
    script: 'async',
    formatting: 'prettify',
    dirStyle: 'nested',
    mock: true,
    includedRoutes(paths, routes) {
      // include path to documents for prerendering
      return routes.flatMap((route) => {
        return route.name === 'documents' ? templates.map((t) => `/documents/${t.id}`) : route.path
      })
    }
  },
  build: {
    minify: 'esbuild'
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
