import getRandom from '../helpers/getRandomData'
import pluralise from '../../src/utils/pluralise'
import { expect } from 'chai'

describe('pluralise', () => {
  it('adds an \'s\' when the number is 0', () => {
    const result = pluralise('support', 0)

    expect(result).to.equal('supports')
  })

  it('does not add an \'s\' when the number is 1', () => {
    const result = pluralise('football', 1)

    expect(result).to.equal('football')
  })

  it('adds an \'s\' when the number is grater than 1', () => {
    const result = pluralise('M&M', getRandom.integer(2, 100))

    expect(result).to.equal('M&Ms')
  })
})
