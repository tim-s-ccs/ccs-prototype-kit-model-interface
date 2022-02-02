import formatDate from '../../src/utils/formatDate'
import getRandom from '../helpers/getRandomData'
import { expect } from 'chai'

describe('formatDate', () => {
  describe('when the time is not included', () => {
    const testData = [
      {month: 'January', date: '2023-1-7', expectedResult: '7 January 2023'},
      {month: 'February', date: '2024-2-13', expectedResult: '13 February 2024'},
      {month: 'March', date: '2023-3-11', expectedResult: '11 March 2023'},
      {month: 'April', date: '2023-4-2', expectedResult: '2 April 2023'},
      {month: 'May', date: '2023-5-6', expectedResult: '6 May 2023'},
      {month: 'June', date: '2022-6-28', expectedResult: '28 June 2022'},
      {month: 'July', date: '2023-7-11', expectedResult: '11 July 2023'},
      {month: 'August', date: '2021-8-31', expectedResult: '31 August 2021'},
      {month: 'September', date: '2024-9-9', expectedResult: '9 September 2024'},
      {month: 'October', date: '2021-10-27', expectedResult: '27 October 2021'},
      {month: 'November', date: '2030-11-20', expectedResult: '20 November 2030'},
      {month: 'December', date: '2030-12-25', expectedResult: '25 December 2030'}
    ]

    testData.forEach(testSet => {
      it(`returns the formatted date, when the month is ${testSet.month}`, () => {
        const date = new Date(testSet.date)
        const result = formatDate(date)

        expect(result).to.eq(testSet.expectedResult)
      })
    })
  })

  describe('when the time is included', () => {
    describe('and the hour is considered', () => {
      const testData = [
        {hour: '00', expectedResult: '18 October 2024, 12:20am'},
        {hour: '01', expectedResult: '18 October 2024, 1:20am'},
        {hour: '02', expectedResult: '18 October 2024, 2:20am'},
        {hour: '03', expectedResult: '18 October 2024, 3:20am'},
        {hour: '04', expectedResult: '18 October 2024, 4:20am'},
        {hour: '05', expectedResult: '18 October 2024, 5:20am'},
        {hour: '06', expectedResult: '18 October 2024, 6:20am'},
        {hour: '07', expectedResult: '18 October 2024, 7:20am'},
        {hour: '08', expectedResult: '18 October 2024, 8:20am'},
        {hour: '09', expectedResult: '18 October 2024, 9:20am'},
        {hour: '10', expectedResult: '18 October 2024, 10:20am'},
        {hour: '11', expectedResult: '18 October 2024, 11:20am'},
        {hour: '12', expectedResult: '18 October 2024, 12:20pm'},
        {hour: '13', expectedResult: '18 October 2024, 1:20pm'},
        {hour: '14', expectedResult: '18 October 2024, 2:20pm'},
        {hour: '15', expectedResult: '18 October 2024, 3:20pm'},
        {hour: '16', expectedResult: '18 October 2024, 4:20pm'},
        {hour: '17', expectedResult: '18 October 2024, 5:20pm'},
        {hour: '18', expectedResult: '18 October 2024, 6:20pm'},
        {hour: '19', expectedResult: '18 October 2024, 7:20pm'},
        {hour: '20', expectedResult: '18 October 2024, 8:20pm'},
        {hour: '21', expectedResult: '18 October 2024, 9:20pm'},
        {hour: '22', expectedResult: '18 October 2024, 10:20pm'},
        {hour: '23', expectedResult: '18 October 2024, 11:20pm'}
      ]

      testData.forEach(testSet => {
        it(`returns the formatted date with the correct hour, when the hour is ${testSet.hour}`, () => {
          const date = new Date(`2024-10-18T${testSet.hour}:20`)
          const result = formatDate(date, true)

          expect(result).to.eq(testSet.expectedResult)
        })
      })
    })

    describe('and the minute is considered', () => {
      it('returns the formated date with a leading zero in the minute when the minute is less than 10', () => {
        const minute = getRandom.integer(0, 9)
        const date = new Date(`2022-02-02T13:0${minute}`)
        const result = formatDate(date, true)

        expect(result).to.eq(`2 February 2022, 1:0${minute}pm`)
      })

      it('returns the formated date without leading zero in the minute when the minute is greater than 9', () => {
        const minute = getRandom.integer(10, 59)
        const date = new Date(`2029-06-10T08:${minute}`)
        const result = formatDate(date, true)

        expect(result).to.eq(`10 June 2029, 8:${minute}am`)
      })
    })
  })
})