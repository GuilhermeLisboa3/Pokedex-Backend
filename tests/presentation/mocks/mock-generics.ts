import { DeleteById } from '@/domain/usecases'
export class DeleteByIdSpy implements DeleteById {
  id: string
  result = true
  async delete (id: string): Promise<boolean> {
    this.id = id
    return this.result
  }
}
