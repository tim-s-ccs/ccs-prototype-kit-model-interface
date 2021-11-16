class IDMismatchError extends Error {
  constructor() {
    super('The ID in the url and the request data do not match')

    this.name = 'IDMismatchError'
  }
}

export default IDMismatchError