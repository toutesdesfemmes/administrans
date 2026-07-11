import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import './assets/main.css'

import { ViteSSG } from 'vite-ssg'
import routerConfig from './router'

export const createApp = ViteSSG(
  App,
  routerConfig,
  ({ app }) => {
    const pinia = createPinia()
    pinia.use(piniaPluginPersistedstate)

    app.use(pinia)
  }
)

// app.mount('#app')
