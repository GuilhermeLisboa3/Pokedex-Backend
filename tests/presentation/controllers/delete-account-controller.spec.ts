import { accountParams } from '@/tests/mocks'
import { DeleteByIdSpy } from '@/tests/presentation/mocks'
import { DeleteAccountController } from '@/presentation/controllers'

const { id } = accountParams

type SutTypes = {
  sut: DeleteAccountController
  deleteByIdSpy: DeleteByIdSpy
}

const makeSut = (): SutTypes => {
  const deleteByIdSpy = new DeleteByIdSpy()
  const sut = new DeleteAccountController(deleteByIdSpy)
  return {
    sut,
    deleteByIdSpy
  }
}

describe('deleteAccount Controller', () => {
  it('should call delete with correct id', async () => {
    const { sut, deleteByIdSpy } = makeSut()
    await sut.handle({ id })
    expect(deleteByIdSpy.id).toBe(id)
  })
})
