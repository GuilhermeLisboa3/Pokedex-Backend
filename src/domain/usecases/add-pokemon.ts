export interface AddPokemon {
  add: (pokemon: AddPokemon.Params, accountId: number) => Promise<boolean>
}

export namespace AddPokemon {
  export type Params = {
    namePokemon: string
    photoPokemon: string
    idPokemon: string
    types: string[]
    urlSpecies: string
  }
}
