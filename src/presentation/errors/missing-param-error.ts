export class MissingParamError extends Error {
  constructor (fieldName: string) {
    super(`Missing param: ${fieldName}`)
    this.name = 'MissingParamError'
  }
}
