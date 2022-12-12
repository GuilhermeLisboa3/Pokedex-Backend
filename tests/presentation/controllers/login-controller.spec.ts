import { accountParams } from '@/tests/mocks'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { LoginController } from '@/presentation/controllers'

const { email, password } = accountParams

type SutTypes = {
  sut: LoginController
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new LoginController(validationSpy)

  return {
    sut,
    validationSpy
  }
}

describe('Login Controller', () => {
  it('should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    await sut.handle({ email, password })
    expect(validationSpy.input).toEqual({ email, password })
  })
})
