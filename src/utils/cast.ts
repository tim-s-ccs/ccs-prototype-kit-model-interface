const cast = (input: string, targetType: string): any => {
  switch(targetType) {
  case 'number':
    if (input.length > 0) {
      return Number(input)
    } else {
      return undefined
    }
  case 'boolean':
    return String(input) === 'true'
  case 'string':
    return String(input)
  }
}

export default cast