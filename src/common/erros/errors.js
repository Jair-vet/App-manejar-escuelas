export class ConnectionError extends Error {
  constructor (message) {
    super(message)
    this.message = 'Error de conexión'
    this.name = 'ConnectionError'
  }
}

export class ApiError extends Error {
  constructor (message, statusCode) {
    super(message, statusCode)
    this.message = message
    this.name = 'Error de servicio'
    this.statusCode = statusCode
  }
}
