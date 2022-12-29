import { AuthenticationToken } from '@/domain/usecases'
import { Decrypter, LoadAccountByIdRepository } from '@/data/protocols'

export class DbAuthenticationToken implements AuthenticationToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository
  ) {}

  async authToken (token: string): Promise<AuthenticationToken.Result> {
    let accountId
    try {
      accountId = await this.decrypter.decrypt(token)
    } catch (error) {
      return null
    }
    if (accountId) {
      const account = await this.loadAccountByIdRepository.loadById(accountId)
      if (account) return account
    }
    return null
  }
}
