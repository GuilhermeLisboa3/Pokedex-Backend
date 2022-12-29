import { AddAccount } from '@/domain/usecases'
import { CheckAccountByEmailRepository, Hasher, AddAccountRepository } from '@/data/protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (account: AddAccount.Params): Promise<boolean> {
    const exists = await this.checkAccountByEmailRepository.checkByEmail(account.email)
    let isValid = false
    if (!exists) {
      const hashPassword = await this.hasher.hash(account.password)
      isValid = await this.addAccountRepository.add({ ...account, password: hashPassword })
    }
    return isValid
  }
}
