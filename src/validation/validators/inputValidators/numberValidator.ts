import InputValidator from '../inputValidator'
import { ActiveModel } from '../../..'
import { ErrorMessages, NumberValidatorOptions } from '../../../types/validation/validator'

class NumberValidator extends InputValidator {
  input: number = this.input
  options: NumberValidatorOptions = this.options

  constructor(model: ActiveModel, attribute: string, errorMessages: ErrorMessages, options: NumberValidatorOptions) {
    super(model, attribute, errorMessages, options)
  }

  _validate = () => {
    if (isNaN(this.input)) {
      this.error = 'notANumber'

      return false
    }

    if (this.options.onlyInteger && !Number.isInteger(this.input)) {
      this.error = 'notAnInteger'

      return false
    }

    if (this.options.greaterThan !== undefined && this.input < this.options.greaterThan) {
      this.error = 'greaterThan'

      return false
    }

    if (this.options.lessThan !== undefined && this.input > this.options.lessThan) {
      this.error = 'lessThan'

      return false
    }

    return true
  }
}

export default NumberValidator
