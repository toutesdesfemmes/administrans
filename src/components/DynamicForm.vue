<script setup>
import { reactive } from 'vue'
import MarkdownRenderer from './MarkdownRenderer.vue'

const emit = defineEmits(['update:modelValue', 'submit'])

const props = defineProps({
  structure: {
    type: Array,
    required: true
  },
  modelValue: {
    type: Object,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const fieldsById = {}
props.structure.forEach((e) => {
  if (e.isInput) {
    fieldsById[e.id] = e
  }
})
const localData = reactive({ ...props.modelValue })
function handleUpdate(field, value) {
  if (field.injectInto) {
    // we implement extremely basic templating here
    // so we can inject values from other fields
    // in the value before injection in another field
    let injectData = { ...localData }
    injectData.sexe = injectData.genre === 'masculin' ? 'homme' : 'femme'
    value = value.replace('{{ sexe }}', injectData.sexe)
    props.structure.forEach((f) => {
      if (f.isInput) {
        const search = `{{ ${f.id} }}`
        value = value.replace(search, injectData[f.id])
      }
    })
    localData[field.injectInto] = value.trim()
  } else {
    localData[field.id] = value
  }
  if (field.action) {
    field.action(localData)
  }
  emit('update:modelValue', localData)
}
</script>

<template>
  <form @submit.prevent="$emit('submit')">
    <div class="document-form">
      <template v-for="element in props.structure" :key="JSON.stringify(element)">
        <template v-if="element.showCondition(localData)">
          <h2 v-if="element.isCategory" class="category">
            {{ element.name }}
          </h2>
          <div
            v-if="element.isInput"
            :class="['field', `field--${element.type}`, element.class || '']"
          >
            <label v-if="element.type != 'checkbox'" :for="`field-${element.id}`">{{
              element.name
            }}</label>
            <textarea
              v-if="element.type === 'textarea'"
              :id="`field-${element.id}`"
              :value="localData[element.id]"
              v-bind="element.attributes || { rows: 3 }"
              :disabled="disabled"
              :placeholder="element.placeholder"
              @input="handleUpdate(element, $event.target.value)"
            />
            <select
              v-else-if="element.type === 'select'"
              :id="`field-${element.id}`"
              :value="localData[element.id]"
              :disabled="disabled"
              @input="handleUpdate(element, $event.target.value)"
            >
              <option v-for="(v, i) in element.choices" :key="i" :value="v.value">
                {{ v.label }}
              </option>
            </select>
            <div v-else-if="element.type === 'checkbox'" class="checkbox">
              <input
                :id="`field-${element.id}`"
                type="checkbox"
                :checked="localData[element.id]"
                :disabled="disabled"
                @change="handleUpdate(element, $event.target.checked)"
              />
              <label :for="`field-${element.id}`">{{ element.name }}</label>
            </div>
            <input
              v-else
              :id="`field-${element.id}`"
              :type="element.type || 'text'"
              :value="localData[element.id]"
              :disabled="disabled"
              :placeholder="element.placeholder"
              @input="handleUpdate(element, $event.target.value)"
            />
            <MarkdownRenderer
              v-if="element.help"
              class="text--small text--italic"
              :source="element.help"
            />
          </div>
        </template>
      </template>
    </div>
    <slot />
  </form>
</template>
