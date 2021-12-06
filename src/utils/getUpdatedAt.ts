const getUpdatedAt = (): string => {
  let currentDate = new Date()
  const offset = currentDate.getTimezoneOffset()
  currentDate = new Date(currentDate.getTime() - (offset*60*1000))
  return currentDate.toISOString().split('T')[0]
}

export default getUpdatedAt