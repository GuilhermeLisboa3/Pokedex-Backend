import { CheckAccountByEmailRepository, AddAccountRepository } from '@/data/protocols'

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
  result = false
  email: string
  async checkByEmail (email: string): Promise<CheckAccountByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class AddAccountRepositorySpy implements AddAccountRepository {
  result = true
  addAccountParams: AddAccountRepository.Params
  async add (accountParams: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    this.addAccountParams = accountParams
    return this.result
  }
}
