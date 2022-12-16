import { accountParams } from '@/tests/mocks'
import { CheckByIdRepositorySpy } from '@/tests/data/mocks'
import { DbDeleteAccount } from '@/data/usecase'

const { id } = accountParams

type SutTypes = {
  sut: DbDeleteAccount
  checkByIdRepositorySpy: CheckByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkByIdRepositorySpy = new CheckByIdRepositorySpy()
  const sut = new DbDeleteAccount(checkByIdRepositorySpy)

  return {
    sut,
    checkByIdRepositorySpy
  }
}

describe('DbDeleteAccount', () => {
  it('should call checkById with correct id', async () => {
    const { sut, checkByIdRepositorySpy } = makeSut()
    await sut.delete(id)
    expect(checkByIdRepositorySpy.id).toBe(id)
  })

  it('should return error if checkById returns false', async () => {
    const { sut, checkByIdRepositorySpy } = makeSut()
    checkByIdRepositorySpy.result = false
    const error = await sut.delete(id)
    expect(error).toEqual(new Error('The received id does not exists'))
  })
})