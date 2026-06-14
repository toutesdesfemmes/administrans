export function renderWithGender(word, gender, appendLetter = 'e') {
  return gender === 'féminin' ? `${word}${appendLetter}` : word
}

export function genderSwitch(mascWord, femWord, gender) {
  return gender === 'féminin' ? femWord : mascWord
}
