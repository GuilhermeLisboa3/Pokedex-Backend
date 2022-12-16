import { AddAccount, Authentication, DeleteById } from '@/domain/usecases'
import { accountParams } from '@/tests/mocks'
export class AddAccountSpy implements AddAccount {
  addAccountParams: AddAccount.Params
  result = true
  async add (account: AddAccount.Params): Promise<AddAccount.Result> {
    this.addAccountParams = account
    return this.result
  }
}

export class AuthenticationSpy implements Authentication {
  AuthenticationParams: Authentication.Params
  authenticationModel = {
    token: accountParams.accessToken,
    name: accountParams.name,
    email: accountParams.email
  }

  async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result> {
    this.AuthenticationParams = authenticationParams
    return this.authenticationModel
  }
}

export class DeleteByIdSpy implements DeleteById {
  id: string
  result = true
  async delete (id: string): Promise<boolean> {
    this.id = id
    return this.result
  }
}
