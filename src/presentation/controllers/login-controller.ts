import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class LoginController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: any): Promise<HttpResponse> {
    this.validation.validate(request)
    return null
  }
}
