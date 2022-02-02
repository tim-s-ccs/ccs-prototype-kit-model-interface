const getCurrentDate = (): string => {
  let currentDate = new Date()
  const offset = currentDate.getTimezoneOffset()
  currentDate = new Date(currentDate.getTime() - (offset*60*1000))
  return currentDate.toISOString()
}

export default getCurrentDate