import { AccountRepository } from '@/infra/database/postgres/repositories'
import { BcryptAdapter, JwtAdapter } from '@/infra/criptography'
import { Controller } from '@/presentation/protocols'
import { LoginController } from '@/presentation/controllers'
import { makeLoginValidation } from '@/main/factories/controllers'
import { DbAuthentication } from '@/data/usecase'
import env from '@/main/config/env'

export const makeLoginController = (): Controller => {
  const salt = 12
  const encrypter = new JwtAdapter(env.jwtSecret, '7d')
  const hasherComparer = new BcryptAdapter(salt)
  const loadByEmailRepository = new AccountRepository()
  const authentication = new DbAuthentication(loadByEmailRepository, hasherComparer, encrypter)
  return new LoginController(makeLoginValidation(), authentication)
}
