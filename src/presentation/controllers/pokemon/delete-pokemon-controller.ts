import { Controller, HttpResponse } from '@/presentation/protocols'
import { DeletePokemon } from '@/domain/usecases'

export class DeletePokemonController implements Controller {
  constructor (
    private readonly deletePokemon: DeletePokemon
  ) {}

  async handle (request: any): Promise<HttpResponse> {
    await this.deletePokemon.delete(request.id)
    return null
  }
}
