import InputValidator from '../inputValidator'
import { ActiveModel } from '../../..'
import { ErrorMessages, LengthValidatorOptions } from '../../../types/validation/validator'

class LengthValidator extends InputValidator {
  input: Array<any> = this.input
  options: LengthValidatorOptions = this.options

  constructor(model: ActiveModel, attribute: string, errorMessages: ErrorMessages, options: LengthValidatorOptions) {
    super(model, attribute, errorMessages, options)
  }

  _validate = (): boolean => {
    if (this.options.min !== undefined && this.input.length < this.options.min) {
      this.error = 'greaterThan'

      return false
    }

    if (this.options.max !== undefined && this.input.length < this.options.max) {
      this.error = 'lessThan'

      return false
    }

    return true
  }
}

export default LengthValidator