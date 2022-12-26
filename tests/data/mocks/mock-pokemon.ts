import { CheckPokemonRepository, AddPokemonRepository } from '@/data/protocols'
export class CheckPokemonRepositorySpy implements CheckPokemonRepository {
  namePokemon: string
  accountId: string
  result = false
  async checkPokemon (namePokemon: string, accountId: string): Promise<boolean> {
    this.namePokemon = namePokemon
    this.accountId = accountId
    return this.result
  }
}

export class AddPokemonRepositorySpy implements AddPokemonRepository {
  addPokemonParams: AddPokemonRepository.Params
  result = true
  async add (pokemonParams: AddPokemonRepository.Params): Promise<AddPokemonRepository.Result> {
    this.addPokemonParams = pokemonParams
    return this.result
  }
}