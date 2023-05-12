export interface ListPokemons {
  list: (accountId: number) => Promise<ListPokemons.Result>
}

export namespace ListPokemons {
  export type Result = Array<{
    id: string
    idPokemon: string
  }>
}
