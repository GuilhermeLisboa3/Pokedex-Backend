import { accountParams } from '@/tests/mocks'
import { DbAddAccount } from '@/data/usecase'
import { CheckAccountByEmailRepositorySpy, HasherSpy, AddAccountRepositorySpy } from '../../mocks'

const { email, name, password } = accountParams
const makeAccountParams = { email, name, password }

type SutTypes = {
  sut: DbAddAccount
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
  hasherSpy: HasherSpy
  addAccountRepositorySpy: AddAccountRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
  const hasherSpy = new HasherSpy()
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const sut = new DbAddAccount(checkAccountByEmailRepositorySpy, hasherSpy, addAccountRepositorySpy)
  return {
    sut,
    checkAccountByEmailRepositorySpy,
    hasherSpy,
    addAccountRepositorySpy
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

  it('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositorySpy, hasherSpy } = makeSut()
    await sut.add(makeAccountParams)
    expect(addAccountRepositorySpy.addAccountParams).toEqual({
      name,
      email,
      password: hasherSpy.hasherPassword
    })
  })

  it('should return false if AddAccountRepository returns false', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    addAccountRepositorySpy.result = false
    const account = await sut.add(makeAccountParams)
    expect(account).toBe(false)
  })

  it('should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    jest.spyOn(addAccountRepositorySpy, 'add').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.add(makeAccountParams)
    await expect(promise).rejects.toThrow()
  })

  it('return true if on success', async () => {
    const { sut } = makeSut()
    const isValid = await sut.add(makeAccountParams)
    expect(isValid).toBe(true)
  })
})
