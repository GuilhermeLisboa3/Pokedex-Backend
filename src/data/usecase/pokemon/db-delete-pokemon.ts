import { DeletePokemon } from '@/domain/usecases'
import { CheckPokemonByIdRepository, DeletePokemonByIdRepository } from '@/data/protocols'

export class DbDeletePokemon implements DeletePokemon {
  constructor (
    private readonly checkPokemonByIdRepository: CheckPokemonByIdRepository,
    private readonly deletePokemonByIdRepository: DeletePokemonByIdRepository
  ) {}

  async delete (idPokemon: string, accountId: number): Promise<boolean> {
    const deletePokemon = await this.checkPokemonByIdRepository.checkById(idPokemon, accountId)
    if (!deletePokemon) {
      return null
    }
    await this.deletePokemonByIdRepository.deleteById(idPokemon, accountId)
    return true
  }
}
