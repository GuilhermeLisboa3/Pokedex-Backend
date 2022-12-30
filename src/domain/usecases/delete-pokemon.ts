
export interface DeletePokemon {
  delete: (idPokemon: string, accountId: number) => Promise<boolean>
}
