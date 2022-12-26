import { CheckPokemonRepository } from '@/data/protocols'
export class CheckPokemonRepositorySpy implements CheckPokemonRepository {
  namePokemon: string
  accountId: string
  result = false
  async checkPokemon (namePokemon: string, accountId: string): Promise<boolean> {
    this.namePokemon = namePokemon
    this.accountId = accountId
    return this.result
  }
}
