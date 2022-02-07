import { ActiveModel, StaticModel } from '../..'
import { Request } from 'express'
import { TableRow } from '../data/tables'
import { ValidationSchema } from '../validation/validationSchema'

export interface ModelInterface {
  data: ModelData
}

export interface ActiveModelInterface {
  data: ActiveModelData
  tableName: string
  modelSchema: ModelSchema
  validationSchema: ValidationSchema
  errors: ActiveModelErrors
  validate(call: string): boolean
  addError(attribute: string, error: string, message: string): void
  errorList(): Array<ListError>
  attributes(): TableRow
  assignAttributes(date: ActiveModelData): void
  save(req: Request, call: string): boolean
  create(req: Request): boolean
}

export interface StaticModelInterface {
}

export type ActiveModelData = ModelData & {
  id: number
}

export type ModelData = {
  [key: string]: any
}

export type ModelError = {
  error: string
  errorMessage: string
}

export type ActiveModelErrors = {
  [key: string]: ModelError
}

export type ListError = {
  text: string
  href: string
}

export type Condition = {
  attribute: string
  value?: any
  values?: any[]
  contents?: any[]
}

export type DataInterfaceFunction = (req: Request, tableName: string, id: number, data: ActiveModelData) => void

export type PrimitiveConstructors = NumberConstructor|StringConstructor|BooleanConstructor

type NormalAttributeConstructor = {
  constructor: PrimitiveConstructors|typeof ActiveModel|typeof StaticModel
}

export type ArrayAttributeConstructor = {
  constructor: ArrayConstructor
  arrayItemConstuctor: PrimitiveConstructors
}

export type ModelSchema = {
  [key: string]: NormalAttributeConstructor|ArrayAttributeConstructor
}
