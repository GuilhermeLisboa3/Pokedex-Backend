import { Authentication } from '@/domain/usecases'
import { LoadByEmailRepository, HasherComparer, Encrypter } from '@/data/protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadByEmailRepository: LoadByEmailRepository,
    private readonly hasherComparer: HasherComparer,
    private readonly encrypter: Encrypter
  ) {}

  async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result> {
    const { email, password } = authenticationParams
    const account = await this.loadByEmailRepository.loadByEmail(email)
    if (account) {
      const isValid = await this.hasherComparer.hashComparer(password, account.password)
      if (isValid) {
        const token = await this.encrypter.encrypt(account.id)
        return {
          token,
          email,
          name: account.name
        }
      }
    }
    return null
  }
}
