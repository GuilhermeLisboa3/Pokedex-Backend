import { badRequest, forbidden, ok, serverError } from '../helpers'
import { Validation, HttpResponse, Controller } from '../protocols'
import { EmailInUseError } from '../errors'
import { AddAccount } from '@/domain/usecases'

export class SingUpController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addAccount: AddAccount
  ) {}

  async handle (request: SingUpController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = request
      const isValid = await this.addAccount.add({
        name,
        email,
        password
      })
      if (!isValid) {
        return forbidden(new EmailInUseError())
      }
      return ok(isValid)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SingUpController {
  export type Request = {
    name: string
    email: string
    password: string
  }
}
