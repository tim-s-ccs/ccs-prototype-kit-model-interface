import InputValidator from '../../validation/validators/inputValidator'
import Model from '../../models/model'
import StaticModel from '../../models/staticModel'
import Validator from '../../validation/validator'
import { ActiveModel, CustomValidator, StaticModelValidator } from '../..'

export type ValidatorOptions = {
  on?: string[]
  conditions?: ValidationCondition<Model>[]
}

export type StringValidatorOptions = ValidatorOptions & {
  required: boolean
  maxLength: number
  pattern?: string
}

export type InclusionValidatorOptions = ValidatorOptions & {
  in: any[]
}

export type NumberValidatorOptions = ValidatorOptions & {
  onlyInteger?: boolean
  greaterThan?: number
  lessThan?: number
}

export type StaticModelValidatorOptions = ValidatorOptions & {
  staticModel: StaticModel
}

export interface ValidatorInterface {
  model: ActiveModel
  attribute: string
  errorMessages: ErrorMessages
  options: ValidatorOptions
  condition: boolean
  error?: string
  valid(call: string): boolean
}

export type ValidatorConstructor = new (model: ActiveModel, attribute: string, errorMessages: ErrorMessages, options: FullValidatorOptions) => Validator

export interface InputValidatorInterface extends ValidatorInterface {
  input: string|number|boolean
}

export type InputValidatorConstructor = new (model: ActiveModel, attribute: string, errorMessages: ErrorMessages, options: InputValidatorOptions) => InputValidator

export interface CustomValidatorInterface extends ValidatorInterface {
}

export type CustomValidatorConstructor = new (model: ActiveModel, attribute: string, errorMessages: ErrorMessages, options: ValidatorOptions) => CustomValidator

export interface StaticModelValidatorInterface extends ValidatorInterface {
  staticModel: StaticModel
}

export type StaticModelValidatorConstructor = new (model: ActiveModel, attribute: string, errorMessages: ErrorMessages, options: StaticModelValidatorOptions) => StaticModelValidator

export type ValidationCondition<T extends Model> = (model: T) => boolean

export type ErrorMessages = {[key: string]: string}

export type FullValidatorOptions = ValidatorOptions & InputValidatorOptions & StaticModelValidatorOptions

type InputValidatorOptions = StringValidatorOptions & InclusionValidatorOptions & NumberValidatorOptions
