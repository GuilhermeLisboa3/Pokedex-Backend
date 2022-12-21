import { faker } from '@faker-js/faker'
import { Hasher, HasherComparer, Encrypter, Decrypter } from '@/data/protocols'

export class HasherSpy implements Hasher {
  password: string
  hasherPassword = faker.datatype.uuid()
  async hash (password: string): Promise<string> {
    this.password = password
    return this.hasherPassword
  }
}

export class HasherComparerSpy implements HasherComparer {
  password: string
  hashPassword: string
  result = true

  async hashComparer (password: string, hashPassword): Promise<boolean> {
    this.password = password
    this.hashPassword = hashPassword
    return this.result
  }
}

export class EncrypterSpy implements Encrypter {
  plaintext: string
  result = faker.datatype.uuid()

  async encrypt (plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return this.result
  }
}

export class DecrypterSpy implements Decrypter {
  plaintext: string
  result = faker.datatype.uuid()

  async decrypt (plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return this.result
  }
}
