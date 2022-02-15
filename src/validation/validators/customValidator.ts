import ActiveModel from '../../models/activeModel'
import Validator from '../validator'
import { CustomValidatorInterface, ErrorMessages, GenericValidatorOptions } from '../../types/validation/validator'

abstract class CustomValidator extends Validator implements CustomValidatorInterface {
  constructor(model: ActiveModel, attribute: string, errorMessages: ErrorMessages, options: GenericValidatorOptions) {
    super(model, attribute, errorMessages, options)
  }
}

export default CustomValidator