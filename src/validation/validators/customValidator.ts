import ActiveModel from '../../models/activeModel'
import Validator from '../validator'
import { CustomValidatorInterface } from '../../types/validation/validator'

abstract class CustomValidator extends Validator implements CustomValidatorInterface {
  model: ActiveModel

  constructor(model: ActiveModel, options: {[key: string]: any}={}) {
    super(options)

    this.model = model
  }
}

export default CustomValidator