import { AddAccount } from '@/domain/usecases'
export class AddAccountSpy implements AddAccount {
  addAccountParams: AddAccount.Params
  result: true
  async add (account: AddAccount.Params): Promise<AddAccount.Result> {
    this.addAccountParams = account
    return this.result
  }
}
