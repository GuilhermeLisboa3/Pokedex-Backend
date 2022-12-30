import { Controller, HttpResponse } from '@/presentation/protocols'
import { DeletePokemon } from '@/domain/usecases'
import { badRequest, serverError, ok } from '@/presentation/helpers'
import { NonExistentFieldError } from '@/presentation/errors'

export class DeletePokemonController implements Controller {
  constructor (
    private readonly deletePokemon: DeletePokemon
  ) {}

  async handle (request: DeletePokemonController.Request): Promise<HttpResponse> {
    try {
      const { id, accountId } = request
      const deletePokemon = await this.deletePokemon.delete(id, accountId)
      if (!deletePokemon) {
        return badRequest(new NonExistentFieldError('idPokemon'))
      }
      return ok(deletePokemon)
    } catch (error) {
      return serverError(error)
    }
  }
}
export namespace DeletePokemonController {
  export type Request = {
    id: string
    accountId: number
  }
}
