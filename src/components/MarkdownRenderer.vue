<script setup>
import { computed } from 'vue'
import { renderMarkdown } from '@/utils'

const props = defineProps({
  source: { type: String, default: '' }
})

const html = computed(() => renderMarkdown(props.source || ''))
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div v-html="html" />
</template>
