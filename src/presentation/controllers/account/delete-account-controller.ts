import { Controller, HttpResponse } from '@/presentation/protocols'
import { DeleteById } from '@/domain/usecases'
import { badRequest, serverError, noContent } from '../../helpers'
import { NonExistentFieldError } from '@/presentation/errors'

export class DeleteAccountController implements Controller {
  constructor (
    private readonly deleteById: DeleteById
  ) {}

  async handle (request: DeleteAccountController.Request): Promise<HttpResponse> {
    try {
      const deleteAccount = await this.deleteById.delete(request.accountId)
      if (!deleteAccount) {
        return badRequest(new NonExistentFieldError('accountId'))
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
export namespace DeleteAccountController {
  export type Request = {
    accountId: string
  }
}
