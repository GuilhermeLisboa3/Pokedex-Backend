import { Validation } from '../protocols'

export class SingUpController {
  constructor (
    private readonly validation: Validation
  ) {}

  handle (httpRequest: any): any {
    this.validation.validate(httpRequest)
  }
}
