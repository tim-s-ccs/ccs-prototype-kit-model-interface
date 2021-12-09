import ActiveModel from '../../models/activeModel'
import StaticModel from '../../models/staticModel'

export type ValidatorOptions = {
  on?: string[]
  condition?: boolean
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
export interface ValidatorInterface {
  options: ValidatorOptions
  condition: boolean
  error?: string
  valid(call: string): boolean
}

export interface InputValidatorInterface extends ValidatorInterface {
  input: any
}

export interface CustomValidatorInterface extends ValidatorInterface {
  model: ActiveModel
}

export interface StaticModelValidatorInterface extends ValidatorInterface {
  model: StaticModel
}

export type ValidationCondition<T extends ActiveModel> = (model: T) => boolean
