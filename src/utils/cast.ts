const cast = (input: string|undefined, targetType: NumberConstructor|StringConstructor|BooleanConstructor): string|number|boolean|undefined => {
  if (input === undefined) return undefined

  switch(targetType) {
  case Number:
    if (input.length > 0) {
      const number = Number(input)

      return isNaN(number) ? undefined : number
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