import { CheckAccountByEmailRepository, AddAccountRepository, LoadByEmailRepository } from '@/data/protocols'
import { accountParams } from '@/tests/mocks'

const { id, name, password } = accountParams

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

export class LoadByEmailRepositorySpy implements LoadByEmailRepository {
  result = {
    id,
    name,
    password
  }

  email: string

  addAccountParams: AddAccountRepository.Params
  async loadByEmail (email: string): Promise<LoadByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}
