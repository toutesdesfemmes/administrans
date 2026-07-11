import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import 'vite-ssg'
import {templates} from './src/documents'

// Injects the self-hosted Umami tracker into every prerendered page. The script is served
// first-party (in.administrans.fr), so ad-blockers see no third-party request.
// Without the env vars, no tag is emitted at all: dev and preview builds never send events.
//
// exclude-search and exclude-hash are load-bearing, not tuning: the tracker builds the page
// URL from window.location.href, and here the query string carries the form data of a share
// link and the hash carries the whole local store (#migrate=). Both must be stripped before
// anything is sent, otherwise personal data would end up in the dashboard.
const umamiPlugin = (env) => ({
  name: 'umami-tracker',
  transformIndexHtml() {
    if (!env.VITE_UMAMI_SRC || !env.VITE_UMAMI_WEBSITE_ID) return []
    return [
      {
        tag: 'script',
        injectTo: 'head',
        attrs: {
          defer: true,
          src: env.VITE_UMAMI_SRC,
          'data-website-id': env.VITE_UMAMI_WEBSITE_ID,
          'data-exclude-search': 'true',
          'data-exclude-hash': 'true',
          ...(env.VITE_UMAMI_DOMAINS ? { 'data-domains': env.VITE_UMAMI_DOMAINS } : {}),
        },
      },
    ]
  },
})

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, fileURLToPath(new URL('.', import.meta.url)), 'VITE_')

  return {
    plugins: [
      vue(),
      umamiPlugin(env),
    ],
    ssgOptions: {
      script: 'async',
      formatting: 'prettify',
      dirStyle: 'nested',
      mock: true,
      includedRoutes(paths, routes) {
        // include path to documents for prerendering
        return routes.flatMap((route) => {
          return route.name === 'documents'
            ? templates.map(t => `/documents/${t.id}`)
            : route.path
        })
      },
    },
    build: {
      minify: 'esbuild',
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
