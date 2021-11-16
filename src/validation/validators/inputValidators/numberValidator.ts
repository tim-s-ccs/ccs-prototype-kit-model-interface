import InputValidator from '../inputValidator'
import { NumberValidatorOptions } from '../../../types/validation/validator'

class NumberValidator extends InputValidator {
  options: NumberValidatorOptions = this.options as NumberValidatorOptions

  constructor(input: number, options: NumberValidatorOptions) {
    super(input, options)
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
