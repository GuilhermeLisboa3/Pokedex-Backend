import { HttpResponse, Middleware } from '@/presentation/protocols'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import { AccessDeniedError } from '@/presentation/errors'
import { AuthenticationToken } from '@/domain/usecases'
export class AuthMiddleware implements Middleware {
  constructor (
    private readonly authenticationToken: AuthenticationToken
  ) {}

  async handle (request: AuthMiddleware.Request): Promise<HttpResponse> {
    try {
      const { token } = request
      if (token) {
        const accessToken = token.replace(/Bearer/, '')
        const account = await this.authenticationToken.authToken(accessToken)
        if (account) {
          return ok({ id: account.id })
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    token?: string
  }
}
