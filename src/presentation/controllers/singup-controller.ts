import { badRequest } from '../helpers'
import { Validation, HttpResponse, Controller } from '../protocols'
import { AddAccount } from '@/domain/usecases'

export class SingUpController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addAccount: AddAccount
  ) {}

  async handle (httpRequest: any): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest)
    if (error) {
      return badRequest(error)
    }
    await this.addAccount.add(httpRequest)
  }
}
