import { SingUpController } from '@/presentation/controllers'
import { badRequest } from '@/presentation/helpers'
import { ValidationSpy, AddAccountSpy } from '../mocks'
import { accountParams } from '@/tests/mocks'

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
})
