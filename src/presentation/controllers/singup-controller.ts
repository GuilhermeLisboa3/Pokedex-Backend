import { Validation, HttpResponse, Controller } from '../protocols'

export class SingUpController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  handle (httpRequest: any): HttpResponse {
    const error = this.validation.validate(httpRequest)
    if (error) {
      return {
        statusCode: 400,
        body: new Error()
      }
    }
  }
}
