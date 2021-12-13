import InputValidator from '../inputValidator'
import { ActiveModel } from '../../..'
import { ErrorMessages, InclusionValidatorOptions } from '../../../types/validation/validator'

class InclusionValidator extends InputValidator {
  options: InclusionValidatorOptions = this.options

  constructor(model: ActiveModel, attribute: string, errorMessages: ErrorMessages, options: InclusionValidatorOptions) {
    super(model, attribute, errorMessages, options)
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