<script setup>
defineProps({
  stepId: { type: String, required: true }
})
</script>

<template>
  <div :id="stepId" :class="{ 'emphasize-block': $route.hash.slice(1) === stepId, 'my-3': true }">
    <slot />
  </div>
</template>
