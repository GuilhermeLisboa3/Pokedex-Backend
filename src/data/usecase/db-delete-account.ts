import { DeleteById } from '@/domain/usecases'
import { CheckByIdRepository } from '@/data/protocols'

export class DbDeleteAccount implements DeleteById {
  constructor (
    private readonly checkByIdRepository: CheckByIdRepository
  ) {}

  async delete (id: string): Promise<Error> {
    const exists = await this.checkByIdRepository.checkById(id)
    if (!exists) return new Error('The received id does not exists')
    return null
  }
}
