import { Controller, HttpResponse } from '@/presentation/protocols'
import { DeleteById } from '@/domain/usecases'
import { badRequest, serverError } from '../helpers'
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
      return {
        statusCode: 204,
        body: null
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
