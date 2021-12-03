import CustomValidator from '../../validation/validators/customValidator'
import InputValidator from '../../validation/validators/inputValidator'
import { ValidatorOptions } from './validator'

export type ValidationScheme = {
  attribute: string
  options: ValidatorOptions & {[key: string]: any}
  errorMessages: {[key: string]: string}
}

export type InputValidationScheme = ValidationScheme & {
  validator: typeof InputValidator
}

export type CustomeValidationScheme = ValidationScheme & {
  validator: typeof CustomValidator
}

export type StaticModelValidationScheme = ValidationScheme

export type ValidationSchema = {
  inputValidations?: Array<InputValidationScheme>
  customValidations?: Array<CustomeValidationScheme>
  staticModelValidations?: Array<StaticModelValidationScheme>
}
