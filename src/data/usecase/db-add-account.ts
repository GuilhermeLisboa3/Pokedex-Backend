import { AddAccount } from '@/domain/usecases'
import { CheckAccountByEmailRepository, Hasher } from '@/data/protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private readonly hasher: Hasher
  ) {}

  async add (account: AddAccount.Params): Promise<boolean> {
    const exists = await this.checkAccountByEmailRepository.checkByEmail(account.email)
    const isValid = false
    if (!exists) {
      await this.hasher.hash(account.password)
      return true
    }
    return isValid
  }
}
