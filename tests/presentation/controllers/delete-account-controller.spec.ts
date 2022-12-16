import { accountParams } from '@/tests/mocks'
import { DeleteByIdSpy } from '@/tests/presentation/mocks'
import { DeleteAccountController } from '@/presentation/controllers'
import { badRequest } from '@/presentation/helpers'

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

  it('should return badRequest if delete returns error', async () => {
    const { sut, deleteByIdSpy } = makeSut()
    deleteByIdSpy.result = new Error()
    const error = await sut.handle({ id })
    expect(error).toEqual(badRequest(deleteByIdSpy.result))
  })
})
