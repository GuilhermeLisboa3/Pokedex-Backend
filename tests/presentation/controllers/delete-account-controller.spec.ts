import { accountParams } from '@/tests/mocks'
import { DeleteByIdSpy } from '@/tests/presentation/mocks'
import { DeleteAccountController } from '@/presentation/controllers'
import { badRequest, serverError } from '@/presentation/helpers'

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

  it('should return 500 if delete returns throws', async () => {
    const { sut, deleteByIdSpy } = makeSut()
    jest.spyOn(deleteByIdSpy, 'delete').mockImplementationOnce(() => { throw new Error() })
    const error = await sut.handle({ id })
    expect(error).toEqual(serverError(new Error()))
  })

  it('should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpReposnse = await sut.handle({ id })
    expect(httpReposnse).toEqual({
      statusCode: 204,
      body: null
    })
  })
})
