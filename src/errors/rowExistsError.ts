class RowExistsError extends Error {
  constructor(id: string) {
    super(`A row with the ID ${id} already exists on the table`)

    this.name = 'RowExistsError'
  }
}

export default RowExistsError