export interface DeletePokemonByIdRepository {
  deleteById: (idPokemon: string) => Promise<void>
}
