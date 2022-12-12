import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helpers'
import { Authentication } from '@/domain/usecases'

export class LoginController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (request: LoginController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    const { email, password } = request
    await this.authentication.auth({ email, password })
  }
}

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
}
