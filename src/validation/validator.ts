import { ActiveModel } from '..'
import { ErrorMessages, ValidatorInterface } from '../types/validation/validator'
import { ValidatorOptions } from '../types/validation/validator'

abstract class Validator implements ValidatorInterface {
  model: ActiveModel
  options: ValidatorOptions
  attribute: string
  errorMessages: ErrorMessages
  error: string = ''

  constructor(model: ActiveModel, attribute: string, errorMessages: ErrorMessages, options: ValidatorOptions) {
    this.options = options
    this.model = model
    this.attribute = attribute
    this.errorMessages = errorMessages
  }

  abstract _validate(): boolean

  private condition = (): boolean => {
    if (this.options.conditions === undefined) {
      return true
    } else {
      return this.options.conditions.every(condition => condition(this.model))
    }
  }

  valid = (call: string) => {
    if (this.options.on !== undefined && !this.options.on.includes(call)) return true

    if (!this.condition()) return true

    if (!this._validate()) {
      this.model.addError(this.attribute, this.error, this.errorMessages[this.error])

      return false
    }

    return true
  }
}

export default Validator