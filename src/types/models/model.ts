import { ActiveModel, StaticModel } from '../..'
import { Request } from 'express'
import { ValidationSchema } from '../validation/validationSchema'

export interface ModelInterface {
  data: ModelData
}

export interface ActiveModelInterface {
  tableName: string
  modelSchema: ModelSchema
  validationSchema: ValidationSchema
  errors: {[key: string]: ModelError}
  attributes(): object
  validate(call: string): boolean
  errorList(): Array<ListError>
  save(req: Request): void
}

export interface StaticModelInterface {
}

export type ModelData = {
  id: number
  [key: string]: any
}

export type ModelError = {
  error: string
  errorMessage: string
}

export type ListError = {
  text: string
  href: string
}

export type Condition = {
  attribute: string
  value: any
}

export type DataInterfaceFunction = (req: Request, tableName: string, id: number, data: ModelData) => void

export type ModelSchema = { [key: string]: NumberConstructor|StringConstructor|BooleanConstructor|typeof ActiveModel|typeof StaticModel }
