import { AddPokemon } from '@/domain/usecases'

export class AddPokemonSpy implements AddPokemon {
  addPokemonParams: AddPokemon.Params
  accountId: string
  result = true
  async add (pokemon: AddPokemon.Params, accountId: string): Promise<boolean> {
    this.accountId = accountId
    this.addPokemonParams = pokemon
    return this.result
  }
}
