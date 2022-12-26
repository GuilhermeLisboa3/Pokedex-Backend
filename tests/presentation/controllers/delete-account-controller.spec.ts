import { accountParams } from '@/tests/mocks'
import { DeleteByIdSpy } from '@/tests/presentation/mocks'
import { DeleteAccountController } from '@/presentation/controllers'
import { badRequest, serverError, noContent } from '@/presentation/helpers'
import { NonExistentFieldError } from '@/presentation/errors'

const makeRequest = {
  accountId: accountParams.id
}

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
    await sut.handle(makeRequest)
    expect(deleteByIdSpy.id).toBe(makeRequest.accountId)
  })

  it('should return badRequest if delete returns null', async () => {
    const { sut, deleteByIdSpy } = makeSut()
    deleteByIdSpy.result = null
    const error = await sut.handle(makeRequest)
    expect(error).toEqual(badRequest(new NonExistentFieldError('accountId')))
  })

  it('should return 500 if delete returns throws', async () => {
    const { sut, deleteByIdSpy } = makeSut()
    jest.spyOn(deleteByIdSpy, 'delete').mockImplementationOnce(() => { throw new Error() })
    const error = await sut.handle(makeRequest)
    expect(error).toEqual(serverError(new Error()))
  })

  it('should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpReposnse = await sut.handle(makeRequest)
    expect(httpReposnse).toEqual(noContent())
  })
})
