const pluralise = (str: string, amount: number): string => {
  if (amount > 1 || amount === 0) {
    return (`${str}s`)
  } else {
    return str
  }
}

export default pluralise