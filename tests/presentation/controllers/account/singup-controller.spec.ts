import { SingUpController } from '@/presentation/controllers'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'
import { ValidationSpy, AddAccountSpy } from '../../mocks'
import { accountParams } from '@/tests/mocks'
import { EmailInUseError } from '@/presentation/errors'

const { name, email, password } = accountParams
const makeRequest = {
  name,
  email,
  password
}

type SutTypes = {
  sut: SingUpController
  validation: ValidationSpy
  addAccountSpy: AddAccountSpy
}

const makeSut = (): SutTypes => {
  const validation = new ValidationSpy()
  const addAccountSpy = new AddAccountSpy()
  const sut = new SingUpController(validation, addAccountSpy)
  return {
    sut,
    validation,
    addAccountSpy
  }
}

describe('SingUp Controller', () => {
  it('should call Validation with correct value ', async () => {
    const { sut, validation } = makeSut()
    await sut.handle(makeRequest)
    expect(validation.input).toEqual(makeRequest)
  })

  it('should return 400 if Validation returns in error', async () => {
    const { sut, validation } = makeSut()
    validation.error = new Error()
    const httpResponse = await sut.handle(makeRequest)
    expect(httpResponse).toEqual(badRequest(validation.error))
  })

  it('should call AddAccount with correct value ', async () => {
    const { sut, addAccountSpy } = makeSut()
    await sut.handle(makeRequest)
    expect(addAccountSpy.addAccountParams).toEqual(makeRequest)
  })

  it('should return 403 if AddAccount returns null ', async () => {
    const { sut, addAccountSpy } = makeSut()
    addAccountSpy.result = false
    const httpResponse = await sut.handle(makeRequest)
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  it('should return 500 if AddAccount returns throws ', async () => {
    const { sut, addAccountSpy } = makeSut()
    jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(makeRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('should return 200 on success ', async () => {
    const { sut, addAccountSpy } = makeSut()
    const httpResponse = await sut.handle(makeRequest)
    expect(httpResponse).toEqual(ok(addAccountSpy.result))
  })
})
