export interface CheckPokemonRepository {
  checkPokemon: (namePokemon: string, accountId: number) => Promise<boolean>
}
