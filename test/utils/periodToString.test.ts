import periodToString from '../../src/utils/periodToString'
import { expect } from 'chai'

describe('periodToString', () => {
  it('returns \'3 years\' when the years are 3 and the months are 0', () => {
    const result = periodToString(3, 0)

    expect(result).to.equal('3 years')
  })

  it('returns \'3 months\' when the years are 0 and the months are 3', () => {
    const result = periodToString(0, 3)

    expect(result).to.equal('3 months')
  })

  it('returns \'1 year and 1 month\' when the years are 1 and the months are 1', () => {
    const result = periodToString(1, 1)

    expect(result).to.equal('1 year and 1 month')
  })

  it('returns \'3 years and 3 months\' when the years are 3 and the months are 3', () => {
    const result = periodToString(3, 3)

    expect(result).to.equal('3 years and 3 months')
  })
})
