import { Request } from 'express'
import { ValidationSchema } from '../validation/validationSchema'

export interface ModelInterface {
  data: ModelData
}

export interface ActiveModelInterface {
  tableName: string
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