class KeysDoNotMatchError extends Error {
  constructor() {
    super('The keys in the submitted data do not match the keys in the table')

    this.name = 'KeysDoNotMatchError'
  }
}

export default KeysDoNotMatchError