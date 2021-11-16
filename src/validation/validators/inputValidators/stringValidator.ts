import InputValidator from '../inputValidator'
import { StringValidatorOptions } from '../../../@types/validation/validator'

class StringValidator extends InputValidator {
  options: StringValidatorOptions = this.options as StringValidatorOptions

  constructor(input: string, options: StringValidatorOptions) {
    super(input, options)
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