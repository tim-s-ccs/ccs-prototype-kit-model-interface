class AuthenticationError extends Error {
  constructor() {
    super('Request not authorized')

    this.name = 'AuthenticationError'
  }
}

export default AuthenticationError