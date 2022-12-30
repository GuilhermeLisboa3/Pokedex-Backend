export interface CheckPokemonByIdRepository {
  checkById: (idPokemon: string, accountId: number) => Promise<boolean>
}
