import { Validation } from '../protocols'

export class SingUpController {
  constructor (
    private readonly validation: Validation
  ) {}

  handle (httpRequest: any): any {
    const error = this.validation.validate(httpRequest)
    if (error) {
      return {
        statusCode: 400,
        body: new Error()
      }
    }
  }
}
