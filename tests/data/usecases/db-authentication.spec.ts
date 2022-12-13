import { LoadByEmailRepositorySpy, HasherComparerSpy } from '@/tests/data/mocks'
import { accountParams } from '@/tests/mocks'
import { DbAuthentication } from '@/data/usecase'

const { email, password } = accountParams

type SutTypes = {
  sut: DbAuthentication
  loadByEmailRepositorySpy: LoadByEmailRepositorySpy
  hasherComparerSpy: HasherComparerSpy
}

const makeSut = (): SutTypes => {
  const loadByEmailRepositorySpy = new LoadByEmailRepositorySpy()
  const hasherComparerSpy = new HasherComparerSpy()
  const sut = new DbAuthentication(loadByEmailRepositorySpy, hasherComparerSpy)
  return {
    sut,
    loadByEmailRepositorySpy,
    hasherComparerSpy
  }
}
describe('DbAuthentication', () => {
  it('should call LoadByEmailRepository with correct email', async () => {
    const { sut, loadByEmailRepositorySpy } = makeSut()
    await sut.auth({ email, password })
    expect(loadByEmailRepositorySpy.email).toEqual(email)
  })

  it('should throw if LoadByEmailRepository returns throws', async () => {
    const { sut, loadByEmailRepositorySpy } = makeSut()
    jest.spyOn(loadByEmailRepositorySpy, 'loadByEmail').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.auth({ email, password })
    await expect(promise).rejects.toThrow()
  })

  it('should call HasherComparer with correct values', async () => {
    const { sut, hasherComparerSpy, loadByEmailRepositorySpy } = makeSut()
    await sut.auth({ email, password })
    expect(hasherComparerSpy.password).toBe(password)
    expect(hasherComparerSpy.hashPassword).toBe(loadByEmailRepositorySpy.result.password)
  })

  it('should return null if HasherComparer returns false', async () => {
    const { sut, hasherComparerSpy } = makeSut()
    hasherComparerSpy.result = false
    const httpResponse = await sut.auth({ email, password })
    expect(httpResponse).toBeNull()
  })
})
