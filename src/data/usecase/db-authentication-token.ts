import { AuthenticationToken } from '@/domain/usecases'
import { Decrypter } from '@/data/protocols'

export class DbAuthenticationToken implements AuthenticationToken {
  constructor (
    private readonly decrypter: Decrypter
  ) {}

  async authToken (token: string): Promise<AuthenticationToken.Result> {
    await this.decrypter.decrypt(token)
    return null
  }
}
