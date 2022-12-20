import { HttpResponse, Middleware } from '@/presentation/protocols'
import { forbidden } from '@/presentation/helpers'
import { AccessDeniedError } from '@/presentation/errors'
import { AuthenticationToken } from '@/domain/usecases'
export class AuthMiddleware implements Middleware {
  constructor (
    private readonly authenticationToken: AuthenticationToken
  ) {}

  async handle (request: AuthMiddleware.Request): Promise<HttpResponse> {
    const { token } = request
    if (token) {
      await this.authenticationToken.authToken(token)
    }
    return forbidden(new AccessDeniedError())
  }
}

export namespace AuthMiddleware {
  export type Request = {
    token?: string
  }
}
