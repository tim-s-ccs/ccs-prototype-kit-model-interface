import StaticModel from '../../models/staticModel'
import Validator from '../validator'
import { StaticModelValidatorInterface } from '../../types/validation/validator'

class StaticModelValidator extends Validator implements StaticModelValidatorInterface {
  model: StaticModel

  constructor(model: StaticModel, options: {[key: string]: any}={}) {
    super(options)

    this.model = model
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