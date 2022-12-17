import { accountParams } from '@/tests/mocks'
import { CheckByIdRepositorySpy, DeleteByIdRepositorySpy } from '@/tests/data/mocks'
import { DbDeleteAccount } from '@/data/usecase'

const { id } = accountParams

type SutTypes = {
  sut: DbDeleteAccount
  checkByIdRepositorySpy: CheckByIdRepositorySpy
  deleteByIdRepositorySpy: DeleteByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkByIdRepositorySpy = new CheckByIdRepositorySpy()
  const deleteByIdRepositorySpy = new DeleteByIdRepositorySpy()
  const sut = new DbDeleteAccount(checkByIdRepositorySpy, deleteByIdRepositorySpy)

  return {
    sut,
    checkByIdRepositorySpy,
    deleteByIdRepositorySpy
  }
}

describe('DbDeleteAccount', () => {
  it('should call CheckByIdRepository with correct id', async () => {
    const { sut, checkByIdRepositorySpy } = makeSut()
    await sut.delete(id)
    expect(checkByIdRepositorySpy.id).toBe(id)
  })

  it('should return error if CheckByIdRepository returns false', async () => {
    const { sut, checkByIdRepositorySpy } = makeSut()
    checkByIdRepositorySpy.result = false
    const error = await sut.delete(id)
    expect(error).toBeNull()
  })

  it('should throw if CheckByIdRepository returns throws', async () => {
    const { sut, checkByIdRepositorySpy } = makeSut()
    jest.spyOn(checkByIdRepositorySpy, 'checkById').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.delete(id)
    await expect(promise).rejects.toThrow()
  })

  it('should call DeleteByIdRepository with correct id', async () => {
    const { sut, deleteByIdRepositorySpy } = makeSut()
    await sut.delete(id)
    expect(deleteByIdRepositorySpy.id).toBe(id)
  })

  it('should throw if DeleteByIdRepository returns throws', async () => {
    const { sut, deleteByIdRepositorySpy } = makeSut()
    jest.spyOn(deleteByIdRepositorySpy, 'deleteById').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.delete(id)
    await expect(promise).rejects.toThrow()
  })

  it('should return true on success', async () => {
    const { sut } = makeSut()
    const deleteAccount = await sut.delete(id)
    expect(deleteAccount).toBe(true)
  })
})
