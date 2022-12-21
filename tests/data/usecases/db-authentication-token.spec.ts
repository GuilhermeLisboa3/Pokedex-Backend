import { accountParams } from '@/tests/mocks'
import { DecrypterSpy, LoadAccountByIdRepositorySpy } from '@/tests/data/mocks'
import { DbAuthenticationToken } from '@/data/usecase'

const { token } = accountParams

type SutTypes = {
  sut: DbAuthenticationToken
  decrypterSpy: DecrypterSpy
  loadAccountByIdRepositorySpy: LoadAccountByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy()
  const loadAccountByIdRepositorySpy = new LoadAccountByIdRepositorySpy()
  const sut = new DbAuthenticationToken(decrypterSpy, loadAccountByIdRepositorySpy)
  return {
    sut,
    decrypterSpy,
    loadAccountByIdRepositorySpy
  }
}

describe('DbAuthenticationToken', () => {
  it('should call Decrypter with correct value ', async () => {
    const { sut, decrypterSpy } = makeSut()
    await sut.authToken(token)
    expect(decrypterSpy.plaintext).toBe(token)
  })

  it('should return null if Decrypter returns null', async () => {
    const { sut, decrypterSpy } = makeSut()
    decrypterSpy.result = null
    const accountId = await sut.authToken(token)
    expect(accountId).toBeNull()
  })

  it('should throws if Decrypter throws', async () => {
    const { sut, decrypterSpy } = makeSut()
    jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(() => { throw new Error() })
    const accountId = await sut.authToken(token)
    expect(accountId).toBeNull()
  })

  it('should call LoadAccountByIdRepository with correct id', async () => {
    const { sut, loadAccountByIdRepositorySpy, decrypterSpy } = makeSut()
    await sut.authToken(token)
    expect(loadAccountByIdRepositorySpy.id).toBe(decrypterSpy.result)
  })
})
