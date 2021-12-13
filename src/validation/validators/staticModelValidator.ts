import StaticModel from '../../models/staticModel'
import Validator from '../validator'
import { ActiveModel } from '../..'
import { ErrorMessages, StaticModelValidatorInterface, StaticModelValidatorOptions } from '../../types/validation/validator'

class StaticModelValidator extends Validator implements StaticModelValidatorInterface {
  staticModel: StaticModel

  constructor(model: ActiveModel, attribute: string, errorMessages: ErrorMessages, options: StaticModelValidatorOptions) {
    super(model, attribute, errorMessages, options)

    this.staticModel = options.staticModel
  }

  _validate = () => {
    if (this.model.data === undefined) {
      this.error = 'required'

      return false
    }

    return true
  }
}

export default StaticModelValidator