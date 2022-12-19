import { DeleteByIdRepository } from '@/data/protocols'
export class DeleteByIdRepositorySpy implements DeleteByIdRepository {
  id: string
  async deleteById (id: string): Promise<void> {
    this.id = id
  }
}
