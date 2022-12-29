
export interface DeletePokemon {
  delete: (idPokemon: string) => Promise<boolean>
}
