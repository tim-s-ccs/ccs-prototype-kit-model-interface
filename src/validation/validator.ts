import { ActiveModel } from '..'
import { ErrorMessages, ValidatorInterface } from '../types/validation/validator'
import { ValidatorOptions } from '../types/validation/validator'

abstract class Validator implements ValidatorInterface {
  model: ActiveModel
  options: ValidatorOptions
  attribute: string
  errorMessages: ErrorMessages
  condition: boolean = true
  error: string = ''

  constructor(model: ActiveModel, attribute: string, errorMessages: ErrorMessages, options: ValidatorOptions) {
    this.options = options
    this.model = model
    this.attribute = attribute
    this.errorMessages = errorMessages

    if (options.conditions !== undefined) {
      this.condition = options.conditions.every(condition => condition(model))
    }
  }

  abstract _validate(): boolean

  valid = (call: string) => {
    if (!this.condition) return true

    if (this.options.on !== undefined && !this.options.on.includes(call)) return true

    if (!this._validate()) {
      this.model.addError(this.attribute, this.error, this.errorMessages[this.error])

      return false
    }

    return true
  }
}

export default Validator