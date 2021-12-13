import InputValidator from '../inputValidator'
import { ActiveModel } from '../../..'
import { ErrorMessages, StringValidatorOptions } from '../../../types/validation/validator'

class StringValidator extends InputValidator {
  input: string = this.input
  options: StringValidatorOptions = this.options

  constructor(model: ActiveModel, attribute: string, errorMessages: ErrorMessages, options: StringValidatorOptions) {
    super(model, attribute, errorMessages, options)
  }

  _validate = () => {
    if (this.options.required) {
      if (this.input === undefined || this.input.length === 0 || this.input.replace(/\s/g, '').length === 0) {
        this.error = 'required'

        return false
      }
    }

    if (this.input !== undefined) {
      if (this.input.length > this.options.maxLength) {
        this.error = 'tooLong'

        return false
      }

      if (this.options.pattern) {
        const regex = new RegExp(this.options.pattern)

        if (!regex.test(this.input)) {
          this.error = 'invalid'

          return false
        }
      }
    }

    return true
  }
}

export default StringValidator