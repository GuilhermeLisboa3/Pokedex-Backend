import { Controller, HttpResponse } from '@/presentation/protocols'
import { DeleteById } from '@/domain/usecases'

export class DeleteAccountController implements Controller {
  constructor (
    private readonly deleteById: DeleteById
  ) {}

  async handle (request: any): Promise<HttpResponse> {
    await this.deleteById.delete(request.id)
    return null
  }
}
