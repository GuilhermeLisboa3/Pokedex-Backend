import { Controller, HttpResponse } from '@/presentation/protocols'
import { ListPokemons } from '@/domain/usecases'
import { ok } from '@/presentation/helpers'

export class ListPokemonsController implements Controller {
  constructor (
    private readonly listPokemons: ListPokemons
  ) {}

  async handle (request: ListPokemonsController.Request): Promise<HttpResponse> {
    const { accountId } = request
    const pokemons = await this.listPokemons.list(accountId)
    return ok(pokemons)
  }
}

export namespace ListPokemonsController {
  export type Request = {
    accountId: number
  }
}
