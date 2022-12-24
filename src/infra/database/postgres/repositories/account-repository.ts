import { CheckAccountByEmailRepository, AddAccountRepository, LoadByEmailRepository, DeleteByIdRepository, CheckByIdRepository, LoadAccountByIdRepository } from '@/data/protocols'
import { Account } from '@/infra/database/postgres/entities'

export class AccountRepository implements CheckAccountByEmailRepository, AddAccountRepository, LoadByEmailRepository, CheckByIdRepository, DeleteByIdRepository, LoadAccountByIdRepository {
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

  async loadByEmail (email: string): Promise<LoadByEmailRepository.Result> {
    const account = await Account.findOne({ where: { email } })
    return account
  }

  async checkById (id: string): Promise<boolean> {
    const account = await Account.findOne({ where: { id } })
    return account != null
  }

  async deleteById (id: string): Promise<void> {
    await Account.destroy({ where: { id } })
  }

  async loadById (id: string): Promise<LoadAccountByIdRepository.Result> {
    const account = await Account.findOne({ where: { id } })
    return account
  }
}
