import { Controller, HttpResponse } from '@/presentation/protocols'
import { DeleteById } from '@/domain/usecases'
import { badRequest, serverError, noContent } from '../helpers'
import { NonExistentFieldError } from '@/presentation/errors'

export class DeleteAccountController implements Controller {
  constructor (
    private readonly deleteById: DeleteById
  ) {}

  async handle (request: any): Promise<HttpResponse> {
    try {
      const deleteAccount = await this.deleteById.delete(request.id)
      if (!deleteAccount) {
        return badRequest(new NonExistentFieldError('id'))
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
