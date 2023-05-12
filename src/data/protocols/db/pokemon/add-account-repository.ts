export interface AddPokemonRepository {
  add: (pokemonParams: AddPokemonRepository.Params) => Promise<AddPokemonRepository.Result>
}

export namespace AddPokemonRepository {
  export type Params = {
    idPokemon: string
    accountId: number
  }
  export type Result = boolean
}
