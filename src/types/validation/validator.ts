import InputValidator from '../../validation/validators/inputValidator'
import StaticModel from '../../models/staticModel'
import Validator from '../../validation/validator'
import { ActiveModel, CustomValidator, StaticModelValidator } from '../..'

export type ValidatorOptions = {
  on?: string[]
  conditions?: ValidationCondition[]
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

export type LengthValidatorOptions = ValidatorOptions & {
  min?: number
  max?: number
}

export type DateValidatorOptions = ValidatorOptions & {
  onOrAfterDate?: string
  onOrBeforeDate?: string
}

export type StaticModelValidatorOptions = ValidatorOptions & {
  staticModel: StaticModel
}

export interface ValidatorInterface {
  model: ActiveModel
  attribute: string
  errorMessages: ErrorMessages
  options: ValidatorOptions
  error?: string
  valid(call: string): boolean
}

export type ValidatorConstructor = new (model: ActiveModel, attribute: string, errorMessages: ErrorMessages, options: FullValidatorOptions) => Validator

export interface InputValidatorInterface extends ValidatorInterface {
  input: any
}

export type InputValidatorConstructor = new (model: ActiveModel, attribute: string, errorMessages: ErrorMessages, options: InputValidatorOptions) => InputValidator

export interface CustomValidatorInterface extends ValidatorInterface {
}

export type CustomValidatorConstructor = new (model: ActiveModel, attribute: string, errorMessages: ErrorMessages, options: ValidatorOptions) => CustomValidator

export interface StaticModelValidatorInterface extends ValidatorInterface {
  staticModel: StaticModel
}

export type StaticModelValidatorConstructor = new (model: ActiveModel, attribute: string, errorMessages: ErrorMessages, options: StaticModelValidatorOptions) => StaticModelValidator

// Remove the need to use any
export type ValidationCondition = (model: any) => boolean

export type ErrorMessages = {[key: string]: string}

export type FullValidatorOptions = ValidatorOptions & InputValidatorOptions & StaticModelValidatorOptions

type InputValidatorOptions = StringValidatorOptions & InclusionValidatorOptions & NumberValidatorOptions & LengthValidatorOptions & DateValidatorOptions

export type GenericValidatorOptions = ValidatorOptions & {[key: string]: any}