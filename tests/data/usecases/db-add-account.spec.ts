import { accountParams } from '@/tests/mocks'
import { DbAddAccount } from '@/data/usecase'
import { CheckAccountByEmailRepositorySpy, HasherSpy } from '../mocks'

const { email, name, password } = accountParams
const makeAccountParams = { email, name, password }

type SutTypes = {
  sut: DbAddAccount
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
  hasherSpy: HasherSpy
}

const makeSut = (): SutTypes => {
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
  const hasherSpy = new HasherSpy()
  const sut = new DbAddAccount(checkAccountByEmailRepositorySpy, hasherSpy)
  return {
    sut,
    checkAccountByEmailRepositorySpy,
    hasherSpy
  }
}

describe('DbAddAccount', () => {
  it('should call CheckAccountByEmailRepository with correct email', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    await sut.add(makeAccountParams)
    expect(checkAccountByEmailRepositorySpy.email).toEqual(email)
  })

  it('should return false if CheckAccountByEmailRepository returns true', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    checkAccountByEmailRepositorySpy.result = true
    const isValid = await sut.add(makeAccountParams)
    expect(isValid).toBeFalsy()
  })

  it('should throw if CheckAccountByEmailRepository returns throws', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    jest.spyOn(checkAccountByEmailRepositorySpy, 'checkByEmail').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.add(makeAccountParams)
    await expect(promise).rejects.toThrow()
  })

  it('should call Hasher with correct password', async () => {
    const { sut, hasherSpy } = makeSut()
    await sut.add(makeAccountParams)
    expect(hasherSpy.password).toEqual(password)
  })

  it('should throw if Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut()
    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.add(makeAccountParams)
    await expect(promise).rejects.toThrow()
  })
})
