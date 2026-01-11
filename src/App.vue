<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { inject, watch, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGlobalStore } from '@/store'
import { useHead, useSeoMeta } from '@vueuse/head'
import {getDefaultState} from './store'

import isEqual from 'lodash/isEqual'

const route = useRoute()
const router = useRouter()
const store = useGlobalStore()

const migrate = reactive({
  redirectDomain: import.meta.env.VITE_REDIRECT_DOMAIN,
  currentDomain: window.location.hostname || 'administrans.fr',
  migrateUrl: null,
  show: true,
})

function migrateData () {
  let data = window.location.hash.split('#migrate=')[1]
  data = window.decodeURI(data)
  try {
    data = JSON.parse(data)
  } catch (e) {
    console.log("Coulnd't parse as JSON:", data)
    return
  }
  console.log("Migration triggered : Importing data", data)
  store.importData(data)
  router.replace(route.fullPath.split('#')[0])

}
function updateMigrateUrl () {
  let currentUrl = new URL(window.location)
  currentUrl.hostname = migrate.redirectDomain
  currentUrl.hash = ""
  // we grab the current store data to include it in the URL
  const data = {
    formData: store.formData,
    steps: store.steps,
    CecMethod: store.CecMethod,
    situation: store.situation,
  }
  if (!isEqual(data, getDefaultState())) {
    currentUrl.hash = `#migrate=${JSON.stringify(data)}`
  }
  migrate.migrateUrl = currentUrl.toString()
}

if ((window.location.hash || '').startsWith('#migrate=')) {
  migrateData()
}
else if (!!migrate.redirectDomain && migrate.redirectDomain != migrate.currentDomain) {
  updateMigrateUrl()
  store.$subscribe(() => {
    updateMigrateUrl()
  })
}
useHead({
  titleTemplate: 'Administrans · %s',
  meta: [
    {
      'http-equiv': 'content-language',
      content: `fr-fr`,
    },
  ]
})
const title = 'Réaliser votre transition administrative'
const description = `Administrans est un site gratuit conçu pour vous aider à réaliser votre transition administrative en France, de A à Z. Suivez le guide pas à pas, générez vos documents, courriers et attestations en quelques clics depuis votre ordinateur ou votre smartphone.`
useSeoMeta({
  title,
  description,
  ogType: 'website',
  ogSiteName: 'Administrans',
  ogLocale: 'fr_FR',
  ogTitle: title,
  ogDescription: description,
  twitterCard: 'summary',
  twitterTitle: title,
  twitterDescription: description,
})

const plausible = inject('plausible')

watch(
  () => route.path,
  (v) => {
    // for backward compat/redirecting old links like /#cec to /cec
    if (v === '/' && window.location.hash) {
      let match = router.resolve(window.location.hash.slice(1))
      if (match.matched.length > 0) {
        router.replace(match.fullPath)
      }
    }
    const config = ({
      url: v,
      domain: window.location.hostname,
      referrer: document.referrer || null,
      deviceWidth: window.innerWidth,
    });
    plausible.trackEvent('pageview', {}, config)
  },
  {immediate: true},
)
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Administrans</RouterLink>
      <RouterLink to="/documents">Documents</RouterLink>
      <RouterLink to="/a-propos">A propos</RouterLink>
    </nav>
  </header>
  <main>
    <div
      class="width--narrow message--primary my-2 px-2 py-2 hide-for-print"
      v-if="migrate.migrateUrl && migrate.show"
    >
      <p>
        <strong>
          Administrans migre sur un nouveau nom de domaine : {{ migrate.redirectDomain }}
        </strong>
      </p>
      <p>Vos données ne seront pas perdues. Cliquez sur le lien ci-dessous pour être redirigé·e immédiatement.</p>
      <a :href="migrate.migrateUrl" class="button">Migrer vers {{ migrate.redirectDomain }}</a>
      <a href="#" class="mx-2" @click.prevent="migrate.show = false">Me le rappeler plus tard</a>
    </div>
    <RouterView />
  </main>
  <footer>
    <div class="grid--row">
      <div class="grid--column text--small text--italic two-third">
        <p>Peaufiné avec amour grâce au travail de nombreuses personnes au fil des ans.</p>
        <p>
          Bien que nous fassions de notre mieux, il est possible que des les informations proposées
          soient incomplètes, inexactes ou obsolètes. N'hésitez pas à nous le signaler.
        </p>
      </div>
      <div class="grid--column one-third">
        <p><strong>Liens utiles</strong></p>
        <RouterLink to="/a-propos#contact"> Nous écrire </RouterLink><br />
        <a href="https://github.com/toutesdesfemmes/administrans"> Page GitHub du projet </a><br />
      </div>
    </div>
    <p></p>
  </footer>
</template>
