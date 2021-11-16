class TableNotFoundError extends Error {
  constructor(tableName: string) {
    super(`A table with name ${tableName} could not be found`)

    this.name = 'TableNotFoundError'
  }
}

export default TableNotFoundError