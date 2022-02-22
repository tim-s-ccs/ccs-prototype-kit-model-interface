import { Condition } from '../models/model'
import { Request } from 'express'
import { Tables } from './tables'

export type GetTablesFunction = (req?: Request) => Tables

export type getTableOptions = {
  tableName: string
  req?: Request
  conditions?: Array<Condition>
}

export type getRowOptions = {
  tableName: string
  primaryKey: string
  primaryKeyValue: string
  req?: Request
}
