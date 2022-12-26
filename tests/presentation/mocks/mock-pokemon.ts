import { AddPokemon } from '@/domain/usecases'

export class AddPokemonSpy implements AddPokemon {
  addPokemonParams: AddPokemon.Params
  result = true
  async add (pokemon: AddPokemon.Params): Promise<boolean> {
    this.addPokemonParams = pokemon
    return this.result
  }
}
