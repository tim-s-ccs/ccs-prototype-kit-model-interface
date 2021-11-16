class UnexpectedDataTypeError extends Error {
  constructor(key: string, table: string, expectedType: string, receivedType: string) {
    super(`There was an unexpected data type for ${key} in ${table}. Expectd type: ${expectedType}. Recieved type: ${receivedType}`)

    this.name = 'UnexpectedDataTypeError'
  }
}

export default UnexpectedDataTypeError