import numberToCurrency from '../../src/utils/numberToCurrency'
import { expect } from 'chai'

describe('numberToCurrency', () => {
  const testData = [
    {input: 0, symbol: '£', expectedResult: '£0'},
    {input: 12, symbol: '$', expectedResult: '$12'},
    {input: 106, symbol: '€', expectedResult: '€106'},
    {input: 4_567, symbol: '£', expectedResult: '£4,567'},
    {input: 90_123, symbol: '£', expectedResult: '£90,123'},
    {input: 920_162, symbol: '$', expectedResult: '$920,162'},
    {input: 1_890_902, symbol: '£', expectedResult: '£1,890,902'},
    {input: 14_423_164, symbol: '$', expectedResult: '$14,423,164'},
    {input: 942_123_562, symbol: '€', expectedResult: '€942,123,562'},
    {input: 1_234_567_890, symbol: '£', expectedResult: '£1,234,567,890'}
  ]

  testData.forEach(testSet => {
    it(`formats the currency correctly when the input is ${testSet.input}`, () => {
      const result = numberToCurrency(testSet.symbol, testSet.input)

      expect(result).to.eq(testSet.expectedResult)
    })
  })
})
