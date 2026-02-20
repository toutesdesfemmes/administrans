<script setup>
import DocumentsList from '../components/DocumentsList.vue'

import { useSeoMeta } from '@vueuse/head'

const title = `Liste des documents et démarches`
const description = `Liste de tous les documents que vous pouvez générer sur le site.`

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterTitle: title,
  twitterDescription: description
})
</script>

<template>
  <section class="width--narrow px-1 py-2">
    <h1>Listes des documents et démarches</h1>
    <p>
      Voici la liste des documents et démarches que vous pouvez entamer directement sur
      Administrans.
    </p>
    <DocumentsList class="my-2" />
  </section>
</template>
