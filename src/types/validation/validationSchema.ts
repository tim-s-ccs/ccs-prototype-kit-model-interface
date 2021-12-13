import {
  CustomValidatorConstructor,
  ErrorMessages,
  GenericValidatorOptions,
  InputValidatorConstructor,
} from './validator'

export type ValidationScheme = {
  attribute: string
  options: GenericValidatorOptions
  errorMessages: ErrorMessages
}

export type InputValidationScheme = ValidationScheme & {
  validator: InputValidatorConstructor
}

export type CustomeValidationScheme = ValidationScheme & {
  validator: CustomValidatorConstructor
}

export type StaticModelValidationScheme = ValidationScheme

export type ValidationSchema = {
  inputValidations?: Array<InputValidationScheme>
  customValidations?: Array<CustomeValidationScheme>
  staticModelValidations?: Array<StaticModelValidationScheme>
}
