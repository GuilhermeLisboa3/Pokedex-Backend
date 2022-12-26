import { AddPokemon } from '@/domain/usecases'
import { CheckPokemonRepository, AddPokemonRepository } from '@/data/protocols'

export class DbAddPokemon implements AddPokemon {
  constructor (
    private readonly checkPokemonRepository: CheckPokemonRepository,
    private readonly addPokemonRepository: AddPokemonRepository
  ) {}

  async add (pokemon: AddPokemon.Params, accountId: string): Promise<boolean> {
    const exists = await this.checkPokemonRepository.checkPokemon(pokemon.namePokemon, accountId)
    let isValid = false
    if (!exists) {
      isValid = await this.addPokemonRepository.add({ ...pokemon, accountId })
    }
    return isValid
  }
}
