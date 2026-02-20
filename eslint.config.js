import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default [
  ...pluginVue.configs['flat/recommended'],
  {
    rules: {
      // override/add rules settings here, such as:
      'vue/no-unused-vars': 'error'
    },
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser
      }
    }
  },
  eslintConfigPrettier
]