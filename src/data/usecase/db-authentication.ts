import { Authentication } from '@/domain/usecases'
import { LoadByEmailRepository, HasherComparer } from '@/data/protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadByEmailRepository: LoadByEmailRepository,
    private readonly hasherComparer: HasherComparer
  ) {}

  async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result> {
    const { email, password } = authenticationParams
    const account = await this.loadByEmailRepository.loadByEmail(email)
    if (account) {
      await this.hasherComparer.hashComparer(password, account.password)
    }
    return null
  }
}
