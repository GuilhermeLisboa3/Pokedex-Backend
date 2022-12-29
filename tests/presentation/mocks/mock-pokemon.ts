import { AddPokemon, ListPokemons, DeletePokemon } from '@/domain/usecases'
import { pokemonParams } from '@/tests/mocks/pokemon-params'

const { id, idPokemon, namePokemon, photoPokemon, types, urlSpecies } = pokemonParams

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

export class ListPokemonsSpy implements ListPokemons {
  accountId: number
  result = [{
    id,
    idPokemon,
    namePokemon,
    photoPokemon,
    types,
    urlSpecies
  }]

  async list (accountId: number): Promise<ListPokemons.Result> {
    this.accountId = accountId
    return this.result
  }
}

export class DeletePokemonSpy implements DeletePokemon {
  idPokemon: string
  result = true

  async delete (idPokemon: string): Promise<boolean> {
    this.idPokemon = idPokemon
    return this.result
  }
}
