import { Controller, HttpResponse } from '@/presentation/protocols'
import { ListPokemons } from '@/domain/usecases'

export class ListPokemonsController implements Controller {
  constructor (
    private readonly listPokemons: ListPokemons
  ) {}

  async handle (request: ListPokemonsController.Request): Promise<HttpResponse> {
    const { accountId } = request
    await this.listPokemons.list(accountId)
    return null
  }
}

export namespace ListPokemonsController {
  export type Request = {
    accountId: number
  }
}
