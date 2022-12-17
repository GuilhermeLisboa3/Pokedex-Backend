import { DeleteById } from '@/domain/usecases'
import { CheckByIdRepository, DeleteByIdRepository } from '@/data/protocols'

export class DbDeleteAccount implements DeleteById {
  constructor (
    private readonly checkByIdRepository: CheckByIdRepository,
    private readonly deleteByIdRepository: DeleteByIdRepository
  ) {}

  async delete (id: string): Promise<boolean> {
    const exists = await this.checkByIdRepository.checkById(id)
    if (!exists) return null
    await this.deleteByIdRepository.deleteById(id)
    return null
  }
}
