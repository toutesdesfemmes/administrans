<script setup>
import { RouterLink } from 'vue-router'
import { ref, watch, inject } from 'vue'
import { useGlobalStore } from '@/store'
import { useRoute } from 'vue-router'

const plausible = inject('plausible')

const route = useRoute()
const props = defineProps({
  stepId: { type: String, required: true },
  link: { type: Boolean, required: false, default: true },
  linkTo: { type: [String, Object], required: false, default: '' }
})

const store = useGlobalStore()
const value = ref(store.steps[props.stepId])

watch(value, (v) => {
  store.setStep(props.stepId, v)
  if (v) {
    plausible.trackEvent('checkItem', { props: { step: props.stepId } }, { url: route.path })
  }
})
</script>

<template>
  <div class="step checkbox">
    <input :id="`check-${stepId}`" v-model="value" type="checkbox" :name="stepId" />
    <label :for="`check-${stepId}`">
      <slot />
    </label>
    <template v-if="link">
      · <RouterLink :to="`#${linkTo || stepId}`"> Détails </RouterLink>
    </template>
    <slot name="after-link" />
  </div>
</template>
