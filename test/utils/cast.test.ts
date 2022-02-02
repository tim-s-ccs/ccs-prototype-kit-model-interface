import cast from '../../src/utils/cast'
import getRandom from '../helpers/getRandomData'
import { expect } from 'chai'

describe('cast', () => {
  describe('when casting to \'Number\'', () => {
    it('returns \'undefined\' when the input is \'\'', () => {
      const result = cast('', Number)

      expect(result).to.eq(undefined)
    })

    it('returns \'NaN\' when the input is a random string', () => {
      const result = cast('something', Number)

      expect(result).to.be.NaN
    })

    it('returns an integer when the input is an integer as a string', () => {
      const input = getRandom.integer(1, 100)
      const result = cast(`${input}`, Number)

      expect(result).to.eq(input)
    })

    it('returns a float when the input is is a float as a string', () => {
      const input = getRandom.float(1, 100)
      const result = cast(`${input}`, Number)

      expect(result).to.eq(input)
    })
  })

  describe('when casting to \'String\'', () => {
    it('returns an empty string when the input is is \'\'', () => {
      const result = cast('', String)

      expect(result).to.eq('')
    })

    it('returns the number as  string when the input is is a random number', () => {
      const input = `${getRandom.integer(1, 100)}`
      const result = cast(input, String)

      expect(result).to.eq(input)
    })

    it('returns the same string when the input is a random string', () => {
      const input = getRandom.string()
      const result = cast(input, String)

      expect(result).to.eq(input)
    })
  })

  describe('when casting to \'Boolean\'', () => {
    it('returns true when the input is is \'true\'', () => {
      const result = cast('true', Boolean)

      expect(result).to.be.true
    })

    it('returns false when the input is is \'false\'', () => {
      const result = cast('false', Boolean)

      expect(result).to.be.false
    })

    it('returns false when the input is a random string', () => {
      const input = getRandom.string(10)
      const result = cast(input, Boolean)

      expect(result).to.be.false
    })
  })
})
