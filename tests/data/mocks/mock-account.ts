import { CheckAccountByEmailRepository, AddAccountRepository, LoadByEmailRepository, CheckByIdRepository, LoadAccountByIdRepository } from '@/data/protocols'
import { accountParams } from '@/tests/mocks'

const { id, name, email, password } = accountParams

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
  async loadByEmail (email: string): Promise<LoadByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class CheckByIdRepositorySpy implements CheckByIdRepository {
  id: string
  result = true
  async checkById (id: string): Promise<boolean> {
    this.id = id
    return this.result
  }
}

export class LoadAccountByIdRepositorySpy implements LoadAccountByIdRepository {
  id: string
  result = {
    id,
    name,
    email
  }

  async loadById (id: string): Promise<LoadAccountByIdRepository.Result> {
    this.id = id
    return this.result
  }
}
