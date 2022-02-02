import addLeadingZeros from '../../src/utils/addLeadingZeros'
import { expect } from 'chai'

describe('addLeadingZeros', () => {
  it ('adds no 0s when the number is the same length', () => {
    const result = addLeadingZeros(123456, 6)

    expect(result).to.equal('123456')
  })

  it ('adds three 0s when the number is three digits short', () => {
    const result = addLeadingZeros(654321, 9)

    expect(result).to.equal('000654321')
  })

  it ('cuts off the number when there are more digits than the length', () => {
    const result = addLeadingZeros(781243, 4)

    expect(result).to.equal('1243')
  })
})
