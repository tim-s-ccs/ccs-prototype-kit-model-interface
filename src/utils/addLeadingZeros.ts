const addLeadingZeros = (num: number, length: number): string => {
  return ('0'.repeat(length) + num).slice(-length)
}

export default addLeadingZeros