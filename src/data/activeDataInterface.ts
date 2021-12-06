import frameworkConfig from '../frameworkConfig'
import IDMismatchError from '../errors/idMismatchError'
import KeysDoNotMatchError from '../errors/keysDoNotMatchError'
import RowExistsError from '../errors/rowExistsError'
import RowNotFoundError from '../errors/rowNotFoundError'
import UnexpectedDataTypeError from '../errors/unexpectedDataTypeError'
import { ActiveDataSchema, ActiveDataScheme } from '../types/data/activeDataSchema'
import { Condition, ModelData } from '../types/models/model'
import { getRow, getTable } from './dataInterface'
import { Request } from 'express'
import { TableRow, Tables } from '../types/data/tables'

const ACTIVE_DATA_SCHEMA_PATH: string = frameworkConfig.activeDataSchemaPath

const activeDataSchema: ActiveDataSchema = require.main?.require(`./${ACTIVE_DATA_SCHEMA_PATH}`).default as ActiveDataSchema

const getActiveTables = (req?: Request): Tables => {
  return req?.session.data.tables as Tables
}

const getActiveTable = (req: Request, tableName: string, conditions?: Array<Condition>): Array<TableRow> => {
  return getTable(getActiveTables, {req: req, tableName: tableName, conditions: conditions})
}

const getActiveRow = (req: Request, tableName: string, id: number): TableRow => {
  return getRow(getActiveTables, {req: req, tableName: tableName, id: id})
}

// Updating data
const validateSentDataSet = (req: Request, tableName: string, id: number, sentData: ModelData) => {
  const rowScheme: ActiveDataScheme = activeDataSchema[tableName]

  const rowKeys: Array<string> = Object.keys(rowScheme).sort()
  const sentRowKeys: Array<string> = Object.keys(sentData).sort()

  console.log('----------------')
  console.log(`rowScheme ${rowScheme}`)
  console.log(`rowKeys ${rowKeys}`)
  console.log(`sentRowKeys ${sentRowKeys}`)
  console.log('----------------')

  if (!(rowKeys.length === sentRowKeys.length && rowKeys.every((key: string, index: number) => key === sentRowKeys[index]))) {
    throw new KeysDoNotMatchError()
  }

  rowKeys.forEach((key: string) => {
    if (sentData[key] !== undefined && rowScheme[key] !== typeof(sentData[key])) throw new UnexpectedDataTypeError(key, tableName, rowScheme[key], typeof(sentData[key]))
  })

  if (getActiveRow(req, tableName, id).id !== sentData.id) throw new IDMismatchError()
}

const setActiveRow = (req: Request, tableName: string, id: number, data: ModelData) => {
  validateSentDataSet(req, tableName, id, data)

  const tables: Tables = getActiveTables(req)

  const index: number = tables[tableName].map(row => row.id).indexOf(id)

  tables[tableName][index] = data
}

// Creating data
const validateSentDataNew = (req: Request, tableName: string, id: number, sentData: ModelData) => {
  const rowScheme: ActiveDataScheme = activeDataSchema[tableName]

  const rowKeys: Array<string> = Object.keys(rowScheme).sort()
  const sentRowKeys: Array<string> = Object.keys(sentData).sort()

  console.log('----------------')
  console.log(`rowScheme ${rowScheme}`)
  console.log(`rowKeys ${rowKeys}`)
  console.log(`sentRowKeys ${sentRowKeys}`)
  console.log('----------------')

  if (!(rowKeys.length === sentRowKeys.length && rowKeys.every((key: string, index: number) => key === sentRowKeys[index]))) {
    throw new KeysDoNotMatchError()
  }

  rowKeys.forEach((key: string) => {
    if (sentData[key] !== undefined && rowScheme[key] !== typeof(sentData[key])) throw new UnexpectedDataTypeError(key, tableName, rowScheme[key], typeof(sentData[key]))
  })

  try {
    getActiveRow(req, tableName, id)
  } catch(error){
    if (!(error instanceof RowNotFoundError)) {
      throw new RowExistsError(id)
    }
  }
}

const addActiveRow = (req: Request, tableName: string, id: number, data: ModelData) => {
  validateSentDataNew(req, tableName, id, data)

  const tables: Tables = getActiveTables(req)

  tables[tableName].push(data)
}

export { getActiveTable, getActiveRow, setActiveRow, addActiveRow }