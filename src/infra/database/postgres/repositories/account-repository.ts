import { CheckAccountByEmailRepository, AddAccountRepository } from '@/data/protocols'
import { Account } from '@/infra/database/postgres/entities'

export class AccountRepository implements CheckAccountByEmailRepository, AddAccountRepository {
  async checkByEmail (email: string): Promise<boolean> {
    const account = await Account.findOne({
      where: {
        email
      }
    })
    return account != null
  }

  async add (accountParams: AddAccountRepository.Params): Promise<boolean> {
    const account = await Account.create(accountParams)
    return account != null
  }
}
