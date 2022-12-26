export interface AddPokemon {
  add: (pokemon: AddPokemon.Params) => Promise<boolean>
}

export namespace AddPokemon {
  export type Params = {
    namePokemon: string
    photoPokemon: string
    idPokemon: number
    types: string[]
    urlSpecies: string
    accountId: number
  }
}
