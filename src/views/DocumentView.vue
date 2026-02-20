<script setup>
import DocumentForm from '../components/DocumentForm.vue'
import templates from '@/documents'
import { useSeoMeta } from '@vueuse/head'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const templatesById = {}
templates.forEach((element) => {
  templatesById[element.id] = element
})
const template = templatesById[props.id]

if (template) {
  const title = `Générer un document · ${template.name}`
  useSeoMeta({
    title,
    description: template.description,
    ogTitle: title,
    ogDescription: template.description,
    twitterTitle: title,
    twitterDescription: template.description
  })
}
</script>
<template>
  <DocumentForm v-if="template" :template="template" :prefill-data="$route.query" />
  <p v-else>Ce document n'existe pas.</p>
</template>
