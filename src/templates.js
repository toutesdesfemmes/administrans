import {
  renderWithGender as rwg,
  genderSwitch as gs
} from '@/lib/utils/gender'

export default function useDocumentTemplate(props) {
  const fieldsById = {}
  props.structure.forEach((e) => {
    if (e.isInput) {
      fieldsById[e.id] = e
    }
  })
  function renderValue(field, defaultValue = null) {
    if (props.data[field]) {
      return props.data[field]
    }
    if (defaultValue) {
      return defaultValue
    }
    if (defaultValue === false) {
      return ''
    }
    if (fieldsById[field]) {
      return `<${fieldsById[field].name}>`
    }
    return `<${field}>`
  }
  function renderDate(field) {
    if (props.data[field]) {
      return new Date(props.data[field]).toLocaleDateString('fr-FR')
    }
    if (fieldsById[field]) {
      return `<${fieldsById[field].name}>`
    }
    return `<${field}>`
  }
  function renderWithGender(word, genderField = 'genre', appendLetter = 'e') {
    return rwg(word, props.data[genderField], appendLetter)
  }
  function genderSwitch(mascWord, femWord, genderField = 'genre') {
    return gs(mascWord, femWord, props.data[genderField])
  }
  function renderFullDescription() {
    let name = renderValue('prénom')
    if (props.data.deadname) {
      name = renderValue('deadname')
    }
    return `${name} ${renderValue('nom')}
${renderWithGender('né')} le ${renderDate('dateNaissance')}
à ${renderValue('lieuNaissance')}`
  }
  return {
    renderValue,
    renderDate,
    renderWithGender,
    genderSwitch,
    renderFullDescription
  }
}
