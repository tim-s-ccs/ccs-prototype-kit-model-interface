import RowNotFoundError from '../errors/rowNotFoundError'
import TableNotFoundError from '../errors/tableNotFoundError'
import { getRowOptions, getTableOptions, GetTablesFunction } from '../types/data/dataInterface'
import { TableRow } from '../types/data/tables'

const getTable = (getTables: GetTablesFunction, options: getTableOptions): Array<TableRow> => {
  let table: Array<TableRow> =  getTables(options.req)[options.tableName]

  if (table === undefined) throw new TableNotFoundError(options.tableName)

  if (options.conditions !== undefined) {
    options.conditions.forEach(condition => {
      table = table.filter(row => row[condition.attribute] === condition.value)
    })
  }

  return table
}

const getRow = (getTables: GetTablesFunction, options: getRowOptions): TableRow => {
  const table: Array<TableRow> =  getTable(getTables, options)

  const row: TableRow | undefined = table.find(row => row.id === options.id)

  if (row === undefined) throw new RowNotFoundError(options.tableName, options.id)

  return row
}

export { getTable, getRow }