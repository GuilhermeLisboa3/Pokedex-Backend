import { CheckAccountByEmailRepository } from '@/data/protocols'
import { Account } from '@/infra/database/postgres/entities'

export class AccountRepository implements CheckAccountByEmailRepository {
  async checkByEmail (email: string): Promise<boolean> {
    const account = await Account.findOne({
      where: {
        email
      }
    })
    return account != null
  }
}
