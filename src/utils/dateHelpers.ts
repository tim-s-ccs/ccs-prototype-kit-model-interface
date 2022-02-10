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

const dateHelpers = {
  getCurrentDateTime: getCurrentDateTime,
  getCurrentDateTimeString: getCurrentDateTimeString,
  getCurrentDate: getCurrentDate,
  getCurrentDateString: getCurrentDateString
}

export default dateHelpers