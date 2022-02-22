import { Period } from '../types/utils/dateHelpers'

const getCurrentDateTime = (): Date => {
  const currentDate = new Date()
  const offset = currentDate.getTimezoneOffset()
  return new Date(currentDate.getTime() - (offset*60*1000))
}

const getCurrentDateTimeString = (): string => {
  return getCurrentDateTime().toISOString()
}

const getCurrentDate = (): Date => {
  const currentDate = getCurrentDateTime()
  currentDate.setHours(0,0,0,0)

  return currentDate
}

const getCurrentDateString = (): string => {
  return getCurrentDate().toISOString()
}

const addPeriodToDate = (date: Date, period: Period): Date => {
  if (period.years !== undefined) date.setFullYear(date.getFullYear() + period.years)
  if (period.months !== undefined) date.setMonth(date.getMonth() + period.months)
  if (period.days !== undefined) date.setDate(date.getDate() + period.days)

  return date
}

const dateHelpers = {
  getCurrentDateTime: getCurrentDateTime,
  getCurrentDateTimeString: getCurrentDateTimeString,
  getCurrentDate: getCurrentDate,
  getCurrentDateString: getCurrentDateString,
  addPeriodToDate: addPeriodToDate
}

export default dateHelpers