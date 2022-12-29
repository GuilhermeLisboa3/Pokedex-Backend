import { Controller, HttpResponse } from '@/presentation/protocols'
import { DeletePokemon } from '@/domain/usecases'
import { badRequest } from '@/presentation/helpers'
import { NonExistentFieldError } from '@/presentation/errors'

export class DeletePokemonController implements Controller {
  constructor (
    private readonly deletePokemon: DeletePokemon
  ) {}

  async handle (request: any): Promise<HttpResponse> {
    const deletePokemon = await this.deletePokemon.delete(request.id)
    if (!deletePokemon) {
      return badRequest(new NonExistentFieldError('idPokemon'))
    }
    return null
  }
}
