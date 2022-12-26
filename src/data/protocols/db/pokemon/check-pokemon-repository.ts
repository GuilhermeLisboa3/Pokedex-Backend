export interface CheckPokemonRepository {
  checkPokemon: (namePokemon: string, accountId: string) => Promise<boolean>
}
