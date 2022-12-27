export interface AddPokemonRepository {
  add: (pokemonParams: AddPokemonRepository.Params) => Promise<AddPokemonRepository.Result>
}

export namespace AddPokemonRepository {
  export type Params = {
    namePokemon: string
    photoPokemon: string
    idPokemon: string
    types: string[]
    urlSpecies: string
    accountId: number
  }
  export type Result = boolean
}
