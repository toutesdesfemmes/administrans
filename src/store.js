import { defineStore } from 'pinia'

// necessary for prerendering as we cannot reference window
// at app creation time
const storage = {
  getItem(key) {
    return window.localStorage.getItem(key)
  },
  setItem(key, value) {
    return window.localStorage.setItem(key, value)
  }
}

export function getDefaultState() {
  return {
    formData: {},
    steps: {},
    CecMethod: 'prénomPuisSexe',
    situation: 'françaisRésidantEnFrance'
  }
}

export const useGlobalStore = defineStore('global', {
  persist: {
    key: 'store.global',
    paths: ['formData', 'steps', 'CecMethod', 'situation'],
    storage: storage
  },
  state: () => getDefaultState(),
  actions: {
    persistFormData(data) {
      this.formData = {
        ...this.formData,
        ...data
      }
      if (this.formData.prénom) {
        this.setStep('chooseNames', true)
      }
    },
    setStep(id, value) {
      this.steps[id] = value
    },
    setCecMethod(value) {
      this.CecMethod = value
    },
    setSituation(value) {
      this.situation = value
    },

    importData(data) {
      let defaultState = getDefaultState()
      this.formData = data.formData || defaultState.formData
      this.steps = data.steps || defaultState.steps
      this.CecMethod = data.CecMethod || defaultState.CecMethod
      this.situation = data.situation || defaultState.situation
    },

    deleteData() {
      Object.assign(this, getDefaultState())
    }
  }
})
