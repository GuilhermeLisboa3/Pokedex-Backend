import { CheckPokemonRepository, AddPokemonRepository, ListPokemonsRepository, CheckPokemonByIdRepository, DeletePokemonByIdRepository } from '@/data/protocols'
import { pokemonParams } from '@/tests/mocks'

const { id, namePokemon, idPokemon, photoPokemon, types, urlSpecies } = pokemonParams
export class CheckPokemonRepositorySpy implements CheckPokemonRepository {
  namePokemon: string
  accountId: number
  result = false
  async checkPokemon (namePokemon: string, accountId: number): Promise<boolean> {
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

export class ListPokemonsRepositorySpy implements ListPokemonsRepository {
  accountId: number
  result = [{
    id,
    namePokemon,
    idPokemon,
    photoPokemon,
    types,
    urlSpecies
  }]

  async list (accountId: number): Promise<ListPokemonsRepository.Result> {
    this.accountId = accountId
    return this.result
  }
}

export class CheckPokemonByIdRepositorySpy implements CheckPokemonByIdRepository {
  idPokemon: string
  accountId: number
  result = true

  async checkById (idPokemon: string, accountId: number): Promise<boolean> {
    this.idPokemon = idPokemon
    this.accountId = accountId
    return this.result
  }
}

export class DeletePokemonByIdRepositorySpy implements DeletePokemonByIdRepository {
  idPokemon: string
  accountId: number

  async deleteById (idPokemon: string, accountId: number): Promise<void> {
    this.idPokemon = idPokemon
    this.accountId = accountId
  }
}
