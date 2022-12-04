import { AddAccount } from '@/domain/usecases'
import { CheckAccountByEmailRepository } from '@/data/protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
  ) {}

  async add (account: AddAccount.Params): Promise<boolean> {
    await this.checkAccountByEmailRepository.checkByEmail(account.email)
    return null
  }
}
