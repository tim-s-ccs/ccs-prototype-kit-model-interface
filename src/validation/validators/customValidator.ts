import ActiveModel from '../../models/activeModel'
import Validator from '../validator'
import { CustomValidatorInterface, ErrorMessages, ValidatorOptions } from '../../types/validation/validator'

abstract class CustomValidator extends Validator implements CustomValidatorInterface {
  constructor(model: ActiveModel, attribute: string, errorMessages: ErrorMessages, options: ValidatorOptions) {
    super(model, attribute, errorMessages, options)
  }
}

export default CustomValidator