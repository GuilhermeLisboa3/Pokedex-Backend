import { AddPokemon } from '@/domain/usecases'
import { CheckPokemonByIdRepository, AddPokemonRepository } from '@/data/protocols'

export class DbAddPokemon implements AddPokemon {
  constructor (
    private readonly checkPokemonRepository: CheckPokemonByIdRepository,
    private readonly addPokemonRepository: AddPokemonRepository
  ) {}

  async add (pokemon: AddPokemon.Params, accountId: number): Promise<boolean> {
    const exists = await this.checkPokemonRepository.checkById(pokemon.idPokemon, accountId)
    let isValid = false
    if (!exists) {
      isValid = await this.addPokemonRepository.add({ ...pokemon, accountId })
    }
    return isValid
  }
}
