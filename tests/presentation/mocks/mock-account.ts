import { AddAccount, Authentication, AuthenticationToken } from '@/domain/usecases'
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
    token: accountParams.token,
    name: accountParams.name,
    email: accountParams.email
  }

  async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result> {
    this.AuthenticationParams = authenticationParams
    return this.authenticationModel
  }
}

export class AuthenticationTokenSpy implements AuthenticationToken {
  token: string
  accountId = {
    id: accountParams.id
  }

  async authToken (token: string): Promise<AuthenticationToken.Result> {
    this.token = token
    return this.accountId
  }
}
