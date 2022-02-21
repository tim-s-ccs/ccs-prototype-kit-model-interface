class RowNotFoundError extends Error {
  constructor(tableName: string, id: string|number) {
    super(`A row with ID ${id} for the table ${tableName} could not be found`)

    this.name = 'RowNotFoundError'
  }
}

export default RowNotFoundError