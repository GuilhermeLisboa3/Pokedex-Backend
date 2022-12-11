import { makeSignUpValidation } from './singup-validation-factory'
import { Controller } from '@/presentation/protocols'
import { SingUpController } from '@/presentation/controllers'
import { DbAddAccount } from '@/data/usecase'
import { AccountRepository } from '@/infra/database/postgres/repositories'
import { BcryptAdapter } from '@/infra/criptography'

export const makeSingUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountRepository = new AccountRepository()
  const dbAddAccount = new DbAddAccount(accountRepository, bcryptAdapter, accountRepository)
  return new SingUpController(makeSignUpValidation(), dbAddAccount)
}
