import Validator from '../validator'
import { InputValidatorInterface } from '../../types/validation/validator'

abstract class InputValidator extends Validator implements InputValidatorInterface {
  input: any

  constructor(input: any, options: {[key: string]: any}={}) {
    super(options)

    this.input = input
  }
}

export default InputValidator