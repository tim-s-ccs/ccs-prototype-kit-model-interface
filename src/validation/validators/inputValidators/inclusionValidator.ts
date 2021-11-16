import InputValidator from '../inputValidator'
import { InclusionValidatorOptions } from '../../../@types/validation/validator'

class InclusionValidator extends InputValidator {
  options: InclusionValidatorOptions = this.options as InclusionValidatorOptions

  constructor(input: string, options: InclusionValidatorOptions) {
    super(input, options)
  }

  _validate = (): boolean => {
    if (!this.options.in.includes(this.input)) {
      this.error = 'invalid'

      return false
    }

    return true
  }
}

export default InclusionValidator