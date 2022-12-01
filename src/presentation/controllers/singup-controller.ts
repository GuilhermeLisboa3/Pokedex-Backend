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
    const isValid = await this.addAccount.add(httpRequest)
    if (!isValid) {
      return {
        statusCode: 403,
        body: new Error('The received email is already in use')
      }
    }
  }
}
