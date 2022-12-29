import { ListPokemonsRepository } from '@/data/protocols'
import { ListPokemons } from '@/domain/usecases'

export class DbListPokemons implements ListPokemons {
  constructor (
    private readonly listPokemonsRepository: ListPokemonsRepository
  ) {}

  async list (accountId: number): Promise<ListPokemons.Result> {
    const pokemons = await this.listPokemonsRepository.list(accountId)
    return pokemons
  }
}
