import addLeadingZeros from './addLeadingZeros'

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const hourToTwelveHour = (hour: number): number => {
  const twelveHour = hour % 12

  if (twelveHour === 0) {
    return 12
  } else {
    return twelveHour
  }
}

const amOrPm = (hour: number): string => {
  if (hour < 12) {
    return 'am'
  } else {
    return 'pm'
  }
}

const datePart = (date: Date): string => {
  return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`
}

const timePart = (date: Date): string => {
  return `${hourToTwelveHour(date.getHours())}:${addLeadingZeros(date.getMinutes(), 2)}${amOrPm(date.getHours())}`
}

const formatDate = (date: Date, withTime: boolean = false): string => {
  const dateString = datePart(date)

  if (withTime) {
    return `${dateString}, ${timePart(date)}`
  } else {
    return dateString
  }
}

export default formatDate
