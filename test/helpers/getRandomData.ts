// Get a random integer
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(getRandomFloat(min, max))
}

// Get a random float
const getRandomFloat = (min: number, max: number): number => {
  return Math.random() * (max - min + 1) + min
}

// Get a random string of length n
const DEFAULT_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

const getRandomCharFromAlphabet = (): string => {
  return DEFAULT_ALPHABET.charAt(Math.floor(Math.random() * DEFAULT_ALPHABET.length))
}

const getRandomString = (desiredLength: number = 5): string => {
  return Array.from({length: desiredLength}).map(() => {
    return getRandomCharFromAlphabet()
  }).join('')
}

const getRandom = {
  integer: getRandomInt,
  float: getRandomFloat,
  string: getRandomString
}

export default getRandom
