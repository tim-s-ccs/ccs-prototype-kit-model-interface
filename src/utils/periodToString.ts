import pluralise from './pluralise'

const periodToString = (years: number, months: number): string => {
  let text = ''

  if (years > 0) text += `${years} ${pluralise('year', years)}`
  if (years > 0 && months > 0) text += ' and '
  if (months > 0) text += `${months} ${pluralise('month', months)}`

  return text
}

export default periodToString