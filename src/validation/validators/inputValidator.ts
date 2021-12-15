import Validator from '../validator'
import { ActiveModel } from '../..'
import { ErrorMessages, InputValidatorInterface, ValidatorOptions } from '../../types/validation/validator'

abstract class InputValidator extends Validator implements InputValidatorInterface {
  input: any

  constructor(model: ActiveModel, attribute: string, errorMessages: ErrorMessages, options: ValidatorOptions) {
    super(model, attribute, errorMessages, options)

    this.input = this.model.data[attribute]
  }
}

export default InputValidator