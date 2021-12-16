const numberToCurrency = (symbol: string, value: number): string => {
  return `${symbol}${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
}

export default numberToCurrency