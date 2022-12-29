import { Controller, HttpResponse } from '@/presentation/protocols'
import { ListPokemons } from '@/domain/usecases'
import { ok, serverError } from '@/presentation/helpers'

export class ListPokemonsController implements Controller {
  constructor (
    private readonly listPokemons: ListPokemons
  ) {}

  async handle (request: ListPokemonsController.Request): Promise<HttpResponse> {
    try {
      const { accountId } = request
      const pokemons = await this.listPokemons.list(accountId)
      return ok(pokemons)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace ListPokemonsController {
  export type Request = {
    accountId: number
  }
}
