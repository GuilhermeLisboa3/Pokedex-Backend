import { AddAccount } from '@/domain/usecases'
import { CheckAccountByEmailRepository } from '@/data/protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
  ) {}

  async add (account: AddAccount.Params): Promise<boolean> {
    const exists = await this.checkAccountByEmailRepository.checkByEmail(account.email)
    const isValid = false
    if (!exists) {
      return true
    }
    return isValid
  }
}
