export interface AddPokemon {
  add: (pokemon: AddPokemon.Params, accountId: number) => Promise<boolean>
}

export namespace AddPokemon {
  export type Params = {
    idPokemon: string
  }
}
