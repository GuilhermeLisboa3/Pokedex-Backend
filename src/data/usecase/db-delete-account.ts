import { DeleteById } from '@/domain/usecases'
import { CheckByIdRepository } from '@/data/protocols'

export class DbDeleteAccount implements DeleteById {
  constructor (
    private readonly checkByIdRepository: CheckByIdRepository
  ) {}

  async delete (id: string): Promise<Error> {
    await this.checkByIdRepository.checkById(id)
    return null
  }
}
