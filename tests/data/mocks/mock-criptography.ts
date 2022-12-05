import { faker } from '@faker-js/faker'
import { Hasher } from '@/data/protocols'

export class HasherSpy implements Hasher {
  password: string
  hasherPassword = faker.datatype.uuid()
  async hash (password: string): Promise<string> {
    this.password = password
    return this.hasherPassword
  }
}
