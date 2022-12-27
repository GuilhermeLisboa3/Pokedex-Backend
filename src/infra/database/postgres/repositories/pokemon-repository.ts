import { CheckPokemonRepository } from '@/data/protocols'
import { Pokemon } from '@/infra/database/postgres/entities'

export class PokemonRepository implements CheckPokemonRepository {
  async checkPokemon (namePokemon: string, accountId: number): Promise<boolean> {
    const pokemon = await Pokemon.findOne({
      where: {
        namePokemon,
        accountId
      }
    })
    return pokemon != null
  }
}
