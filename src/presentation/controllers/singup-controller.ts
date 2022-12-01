import { badRequest, forbidden, ok, serverError } from '../helpers'
import { Validation, HttpResponse, Controller } from '../protocols'
import { EmailInUseError } from '../errors'
import { AddAccount } from '@/domain/usecases'

export class SingUpController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addAccount: AddAccount
  ) {}

  async handle (httpRequest: any): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest)
      if (error) {
        return badRequest(error)
      }
      const isValid = await this.addAccount.add(httpRequest)
      if (!isValid) {
        return forbidden(new EmailInUseError())
      }
      return ok(isValid)
    } catch (error) {
      return serverError(error)
    }
  }
}
