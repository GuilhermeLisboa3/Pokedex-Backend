export interface ListPokemons {
  list: (accountId: number) => Promise<ListPokemons.Result>
}

export namespace ListPokemons {
  export type Result = Array<{
    id: string
    namePokemon: string
    photoPokemon: string
    idPokemon: string
    types: string[]
    urlSpecies: string
  }>
}
