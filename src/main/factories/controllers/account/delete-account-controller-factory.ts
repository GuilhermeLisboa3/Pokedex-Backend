import { Controller } from '@/presentation/protocols'
import { DeleteAccountController } from '@/presentation/controllers'
import { DbDeleteAccount } from '@/data/usecase/account/db-delete-account'
import { AccountRepository } from '@/infra/database/postgres/repositories'

export const makeDeleteAccountController = (): Controller => {
  const accountRepository = new AccountRepository()
  const dbDeleteAccount = new DbDeleteAccount(accountRepository, accountRepository)
  return new DeleteAccountController(dbDeleteAccount)
}
