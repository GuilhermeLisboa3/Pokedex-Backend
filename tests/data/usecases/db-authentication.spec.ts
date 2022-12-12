import { LoadByEmailRepositorySpy } from '@/tests/data/mocks'
import { accountParams } from '@/tests/mocks'
import { DbAuthentication } from '@/data/usecase'

const { email, password } = accountParams

type SutTypes = {
  sut: DbAuthentication
  loadByEmailRepositorySpy: LoadByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadByEmailRepositorySpy = new LoadByEmailRepositorySpy()
  const sut = new DbAuthentication(loadByEmailRepositorySpy)
  return {
    sut,
    loadByEmailRepositorySpy
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
})
