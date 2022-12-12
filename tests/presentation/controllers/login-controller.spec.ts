import { accountParams } from '@/tests/mocks'
import { ValidationSpy, AuthenticationSpy } from '@/tests/presentation/mocks'
import { LoginController } from '@/presentation/controllers'
import { badRequest } from '@/presentation/helpers'

const { email, password } = accountParams

type SutTypes = {
  sut: LoginController
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const authenticationSpy = new AuthenticationSpy()
  const sut = new LoginController(validationSpy, authenticationSpy)

  return {
    sut,
    validationSpy,
    authenticationSpy
  }
}

describe('Login Controller', () => {
  it('should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    await sut.handle({ email, password })
    expect(validationSpy.input).toEqual({ email, password })
  })

  it('should return 400 if Validation returns in error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const error = await sut.handle({ email, password })
    expect(error).toEqual(badRequest(validationSpy.error))
  })

  it('should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    await sut.handle({ email, password })
    expect(authenticationSpy.AuthenticationParams).toEqual({ email, password })
  })

  it('should return 401 if Authentication returns null', async () => {
    const { sut, authenticationSpy } = makeSut()
    authenticationSpy.authenticationModel = null
    const error = await sut.handle({ email, password })
    expect(error).toEqual({
      statusCode: 401,
      body: new Error('Unauthorized')
    })
  })
})
