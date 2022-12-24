import { Middleware } from '@/presentation/protocols'
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'
import { DbAuthenticationToken } from '@/data/usecase'
import { JwtAdapter } from '@/infra/criptography'
import { AccountRepository } from '@/infra/database/postgres/repositories'
import env from '@/main/config/env'

export const makeAuthMiddleware = (): Middleware => {
  const accountRepository = new AccountRepository()
  const jwtAdapter = new JwtAdapter(env.jwtSecret, '7d')
  const dbAuthenticationToken = new DbAuthenticationToken(jwtAdapter, accountRepository)
  return new AuthMiddleware(dbAuthenticationToken)
}
