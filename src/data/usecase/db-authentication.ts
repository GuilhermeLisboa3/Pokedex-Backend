import { Authentication } from '@/domain/usecases'
import { LoadByEmailRepository } from '@/data/protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadByEmailRepository: LoadByEmailRepository
  ) {}

  async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result> {
    const { email } = authenticationParams
    await this.loadByEmailRepository.loadByEmail(email)
    return null
  }
}
