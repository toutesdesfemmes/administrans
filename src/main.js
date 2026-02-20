import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import './assets/main.css'

import { ViteSSG } from 'vite-ssg'
import routerConfig from './router'

export const createApp = ViteSSG(App, routerConfig, async ({ app }) => {
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)

  app.use(pinia)

  if (import.meta.env.VITE_PLAUSIBLE_URL) {
    console.log('Plausible tracking enabled on ', import.meta.env.VITE_PLAUSIBLE_URL)
    const Plausible = (await import('plausible-tracker')).default
    const plausibleOptions = {
      hashMode: true,
      apiHost: import.meta.env.VITE_PLAUSIBLE_URL,
      domain: import.meta.env.VITE_PLAUSIBLE_TRACKING_DOMAIN,
      trackLocalhost: !!import.meta.env.VITE_PLAUSIBLE_TRACK_LOCALHOST
    }
    const plausible = (Plausible.default || Plausible)(plausibleOptions)
    app.provide('plausible', plausible)
  } else {
    app.provide('plausible', {
      trackEvent: (name, data) => {
        console.log('[Plausible] Disabled, would send', name, data)
      }
    })
  }
})
