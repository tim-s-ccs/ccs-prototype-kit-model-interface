import MockActiveModel from '../../../helpers/mocks/activeModel'
import { expect } from 'chai'
import { StringValidator } from '../../../../src'
import { StringValidatorOptions } from '../../../../src'

describe('stringValidator', () => {
  describe('when required is true', () => {
    console.log('here 1')
    let stringValidator: StringValidator
    console.log('here 2')
    const options: StringValidatorOptions = {
      required: true,
      maxLength: 100
    }
    console.log('here 3')
    beforeEach(() => {
      console.log('here 4')
      const model = new MockActiveModel({}, {}, {})
      console.log('here 5')
      stringValidator = new StringValidator(model, 'input', {}, options)
    })

    it('retuns false and updates the error to required when the input is undefined', () => {
      console.log('here 6')
      const result = stringValidator._validate()
      console.log('here 7')

      expect(result).to.be.true
      expect(stringValidator.error).to.eq('required')
    })
  })
})
