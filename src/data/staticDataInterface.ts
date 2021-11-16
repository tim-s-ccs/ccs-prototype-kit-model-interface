import frameworkConfig from '../frameworkConfig'
import { Condition } from '../types/models/model'
import { getRow, getTable } from './dataInterface'
import { TableRow, Tables } from '../types/data/tables'

const STATIC_DATA_PATH: string = frameworkConfig.staticDataPath

const staticData: Tables = require.main?.require(`./${STATIC_DATA_PATH}`).default as Tables

const getStaticTables = (): Tables => {
  return staticData as Tables
}

const getStaticTable = (tableName: string, conditions?: Array<Condition>): Array<TableRow> => {
  return getTable(getStaticTables, {tableName: tableName, conditions: conditions})
}

const getStaticRow = (tableName: string, id: number): TableRow => {
  return getRow(getStaticTables, {tableName: tableName, id: id})
}

export { getStaticTable, getStaticRow }