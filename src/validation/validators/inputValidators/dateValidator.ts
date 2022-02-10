import InputValidator from '../inputValidator'
import { ActiveModel } from '../../..'
import { DateValidatorOptions, ErrorMessages } from '../../../types/validation/validator'

class DateValidator extends InputValidator {
  input: string = this.input
  options: DateValidatorOptions = this.options

  constructor(model: ActiveModel, attribute: string, errorMessages: ErrorMessages, options: DateValidatorOptions) {
    super(model, attribute, errorMessages, options)
  }

  private todayAtMidnight = (): Date => {
    const date = new Date()
    date.setHours(0,0,0,0)

    return date
  }

  _validate(): boolean {
    const date = new Date(this.input)

    if (!(date instanceof Date && !isNaN(date as unknown as number))) {
      this.error = 'invalidDate'

      return false
    }

    if (this.options.onOrAfterDate !== undefined) {
      let onOrAfterDate: Date

      switch(this.options.onOrAfterDate) {
      case 'today':
        onOrAfterDate = this.todayAtMidnight()
        break
      case 'tommorow':
        onOrAfterDate = this.todayAtMidnight()
        onOrAfterDate.setDate(onOrAfterDate.getDate() + 1)
        break
      default:
        onOrAfterDate = new Date(this.options.onOrAfterDate)
      }

      if (date < onOrAfterDate) {
        this.error = 'invalidOnOrAfterDate'

        return false
      }
    }

    if (this.options.onOrBeforeDate !== undefined) {
      let onOrBeforeDate: Date

      switch(this.options.onOrBeforeDate) {
      case 'today':
        onOrBeforeDate = this.todayAtMidnight()
        break
      case 'yesterday':
        onOrBeforeDate = this.todayAtMidnight()
        onOrBeforeDate.setDate(onOrBeforeDate.getDate() - 1)
        break
      default:
        onOrBeforeDate = new Date(this.options.onOrBeforeDate)
      }

      if (date > onOrBeforeDate) {
        this.error = 'invalidOnOrBeforeDate'

        return false
      }
    }

    return true
  }
}

export default DateValidator
