export interface DeletePokemonByIdRepository {
  deleteById: (idPokemon: string, accountId: number) => Promise<void>
}
