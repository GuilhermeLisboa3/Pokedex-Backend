import { AddPokemon } from '@/domain/usecases'

export class AddPokemonSpy implements AddPokemon {
  addPokemonParams: AddPokemon.Params
  accountId: number
  result = true
  async add (pokemon: AddPokemon.Params, accountId: number): Promise<boolean> {
    this.accountId = accountId
    this.addPokemonParams = pokemon
    return this.result
  }
}
