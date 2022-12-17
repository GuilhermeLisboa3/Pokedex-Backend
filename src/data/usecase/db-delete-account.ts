import { DeleteById } from '@/domain/usecases'
import { CheckByIdRepository } from '@/data/protocols'

export class DbDeleteAccount implements DeleteById {
  constructor (
    private readonly checkByIdRepository: CheckByIdRepository
  ) {}

  async delete (id: string): Promise<boolean> {
    const exists = await this.checkByIdRepository.checkById(id)
    if (!exists) return null
    return null
  }
}
