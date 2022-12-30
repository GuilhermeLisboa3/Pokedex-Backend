import { DeletePokemon } from '@/domain/usecases'
import { CheckPokemonByIdRepository } from '@/data/protocols'

export class DbDeletePokemon implements DeletePokemon {
  constructor (
    private readonly checkPokemonByIdRepository: CheckPokemonByIdRepository
  ) {}

  async delete (idPokemon: string): Promise<boolean> {
    const deletePokemon = await this.checkPokemonByIdRepository.checkById(idPokemon)
    if (!deletePokemon) {
      return null
    }
    return null
  }
}
