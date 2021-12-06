const cast = (input: string, targetType: NumberConstructor|StringConstructor|BooleanConstructor): any => {
  switch(targetType) {
  case Number:
    if (input.length > 0) {
      return Number(input)
    } else {
      return undefined
    }
  case Boolean:
    return String(input) === 'true'
  case String:
    return String(input)
  }
}

export default cast