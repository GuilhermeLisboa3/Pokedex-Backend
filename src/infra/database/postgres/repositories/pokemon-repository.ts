import { CheckPokemonRepository, AddPokemonRepository } from '@/data/protocols'
import { Pokemon } from '@/infra/database/postgres/entities'

export class PokemonRepository implements CheckPokemonRepository, AddPokemonRepository {
  async checkPokemon (namePokemon: string, accountId: number): Promise<boolean> {
    const pokemon = await Pokemon.findOne({
      where: {
        namePokemon,
        accountId
      }
    })
    return pokemon != null
  }

  async add (pokemonParams: AddPokemonRepository.Params): Promise<boolean> {
    const pokemon = await Pokemon.create(pokemonParams)
    return pokemon != null
  }
}
