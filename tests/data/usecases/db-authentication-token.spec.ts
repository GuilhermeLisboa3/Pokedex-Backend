import { accountParams } from '@/tests/mocks'
import { DecrypterSpy } from '@/tests/data/mocks'
import { DbAuthenticationToken } from '@/data/usecase'

const { id } = accountParams

type SutTypes = {
  sut: DbAuthenticationToken
  decrypterSpy: DecrypterSpy
}

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy()
  const sut = new DbAuthenticationToken(decrypterSpy)
  return {
    sut,
    decrypterSpy
  }
}

describe('DbAuthenticationToken', () => {
  it('should call Decrypter with correct value ', async () => {
    const { sut, decrypterSpy } = makeSut()
    await sut.authToken(id)
    expect(decrypterSpy.plaintext).toBe(id)
  })

  it('should return null if Decrypter returns null', async () => {
    const { sut, decrypterSpy } = makeSut()
    decrypterSpy.result = null
    const accountId = await sut.authToken(id)
    expect(accountId).toBeNull()
  })

  it('should throws if Decrypter throws', async () => {
    const { sut, decrypterSpy } = makeSut()
    jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(() => { throw new Error() })
    const accountId = await sut.authToken(id)
    expect(accountId).toBeNull()
  })
})
