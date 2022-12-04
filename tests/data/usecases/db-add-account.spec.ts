import { accountParams } from '@/tests/mocks'
import { DbAddAccount } from '@/data/usecase'
import { CheckAccountByEmailRepositorySpy } from '../mocks'

const { email, name, password } = accountParams
const makeAccountParams = { email, name, password }

type SutTypes = {
  sut: DbAddAccount
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
  const sut = new DbAddAccount(checkAccountByEmailRepositorySpy)
  return {
    sut,
    checkAccountByEmailRepositorySpy
  }
}

describe('DbAddAccount', () => {
  it('should call CheckAccountByEmailRepository with correct email', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    await sut.add(makeAccountParams)
    expect(checkAccountByEmailRepositorySpy.email).toEqual(email)
  })
})
