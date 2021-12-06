class RowExistsError extends Error {
  constructor(id: number) {
    super(`A row with the ID ${id} already exists on the table`)

    this.name = 'RowExistsError'
  }
}

export default RowExistsError