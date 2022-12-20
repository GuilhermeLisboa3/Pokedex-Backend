import { forbidden } from '@/presentation/helpers'
import { AccessDeniedError } from '@/presentation/errors'
import { AuthMiddleware } from '@/presentation/middlewares'
import { accountParams } from '@/tests/mocks'
import { AuthenticationTokenSpy } from '../mocks'

const { token } = accountParams

type SutTypes = {
  sut: AuthMiddleware
  authenticationTokenSpy: AuthenticationTokenSpy
}

const makeSut = (): SutTypes => {
  const authenticationTokenSpy = new AuthenticationTokenSpy()
  const sut = new AuthMiddleware(authenticationTokenSpy)
  return {
    sut,
    authenticationTokenSpy
  }
}

describe('Auth Middleware', () => {
  it('should return 403 if no token exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  it('should call AuthenticationToken with correct token', async () => {
    const { sut, authenticationTokenSpy } = makeSut()
    await sut.handle({ token })
    expect(authenticationTokenSpy.token).toEqual(token)
  })
})
