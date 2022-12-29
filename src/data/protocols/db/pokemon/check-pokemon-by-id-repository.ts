export interface CheckPokemonByIdRepository {
  checkById: (idPokemon: string) => Promise<boolean>
}
