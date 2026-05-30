<script setup>
import { reactive } from 'vue'
import { renderMarkdown } from '@/utils'
import { renderWithGender, genderSwitch } from '@/lib/utils/gender'

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

function applyInjectTemplate(field, rawValue) {
  const injectData = { ...localData, [field.id]: rawValue }
  const gender = injectData.genre
  injectData.sexe = gender === 'masculin' ? 'homme' : 'femme'
  injectData.satisfait = renderWithGender('satisfait', gender)
  injectData.equilibre = genderSwitch('équilibré', 'équilibrée', gender)

  let value = rawValue
  value = value.replace('{{ sexe }}', injectData.sexe)
  value = value.replace('{{ satisfait }}', injectData.satisfait)
  value = value.replace('{{ equilibre }}', injectData.equilibre)
  props.structure.forEach((f) => {
    if (f.isInput) {
      value = value.replace(`{{ ${f.id} }}`, injectData[f.id] ?? '')
    }
  })

  localData[field.id] = rawValue
  localData[field.injectInto] = value.trim()
}

function reInjectExamples() {
  props.structure.forEach((f) => {
    if (f.injectInto && localData[f.id]) {
      applyInjectTemplate(f, localData[f.id])
    }
  })
}

function handleUpdate(field, value) {
  if (field.injectInto) {
    applyInjectTemplate(field, value)
  } else {
    localData[field.id] = value
    if (field.id === 'genre') {
      reInjectExamples()
    }
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
          <h2 v-if="element.isCategory" class="category">{{ element.name }}</h2>
          <div
            v-if="element.isInput"
            :class="['field', `field--${element.type}`, element.class || '']"
          >
            <label v-if="element.type != 'checkbox'" :for="`field-${element.id}`">{{
              element.name
            }}</label>
            <textarea
              v-if="element.type === 'textarea'"
              :value="localData[element.id]"
              :id="`field-${element.id}`"
              v-bind="element.attributes || { rows: 3 }"
              @input="handleUpdate(element, $event.target.value)"
              :disabled="disabled"
              :placeholder="element.placeholder"
            >
            </textarea>
            <select
              v-else-if="element.type === 'select'"
              :value="localData[element.id]"
              :id="`field-${element.id}`"
              @change="handleUpdate(element, $event.target.value)"
              :disabled="disabled"
            >
              <option v-for="(v, i) in element.choices" :key="i" :value="v.value">
                {{ v.label }}
              </option>
            </select>
            <div v-else-if="element.type === 'checkbox'" class="checkbox">
              <input
                type="checkbox"
                :checked="localData[element.id]"
                :id="`field-${element.id}`"
                @change="handleUpdate(element, $event.target.checked)"
                :disabled="disabled"
              />
              <label :for="`field-${element.id}`">{{ element.name }}</label>
            </div>
            <input
              v-else
              :type="element.type || 'text'"
              :value="localData[element.id]"
              :id="`field-${element.id}`"
              @input="handleUpdate(element, $event.target.value)"
              :disabled="disabled"
              :placeholder="element.placeholder"
            />
            <div
              v-if="element.help"
              class="text--small text--italic"
              v-html="renderMarkdown(element.help)"
            ></div>
          </div>
        </template>
      </template>
    </div>
    <slot></slot>
  </form>
</template>
