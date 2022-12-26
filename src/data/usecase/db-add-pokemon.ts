import { AddPokemon } from '@/domain/usecases'
import { CheckPokemonRepository } from '@/data/protocols'

export class DbAddPokemon implements AddPokemon {
  constructor (
    private readonly checkPokemonRepository: CheckPokemonRepository
  ) {}

  async add (pokemon: AddPokemon.Params, accountId: string): Promise<boolean> {
    const { namePokemon } = pokemon
    await this.checkPokemonRepository.checkPokemon(namePokemon, accountId)
    return null
  }
}
