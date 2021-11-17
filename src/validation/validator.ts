import { ValidatorInterface } from '../types/validation/validator'
import { ValidatorOptions } from '../types/validation/validator'

abstract class Validator implements ValidatorInterface {
  options: ValidatorOptions
  condition: boolean
  error: string = ''

  constructor(options: {[key: string]: any}={}) {
    this.options = options
    this.condition = options.condition === undefined ? true : options.condition
  }

  abstract _validate(): boolean

  valid = (call: string) => {
    if (!this.condition) return true

    if (this.options.on !== undefined && !this.options.on.includes(call)) return true

    return this._validate()
  }
}

export default Validator