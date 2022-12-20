import { HttpResponse, Middleware } from '@/presentation/protocols'
import { forbidden } from '@/presentation/helpers'
import { AccessDeniedError } from '@/presentation/errors'

export class AuthMiddleware implements Middleware {
  async handle (request: any): Promise<HttpResponse> {
    return forbidden(new AccessDeniedError())
  }
}
