import { forbidden } from '@/presentation/helpers'
import { AccessDeniedError } from '@/presentation/errors'
import { AuthMiddleware } from '@/presentation/middlewares'

type SutTypes = {
  sut: AuthMiddleware
}

const makeSut = (): SutTypes => {
  const sut = new AuthMiddleware()
  return {
    sut
  }
}

describe('Auth Middleware', () => {
  it('should return 403 if no token exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})
