import { Hasher, HasherComparer } from '@/data/protocols'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher, HasherComparer {
  constructor (private readonly salt: number) {}

  async hash (password: string): Promise<string> {
    const hash = await bcrypt.hash(password, this.salt)
    return hash
  }

  async hashComparer (password: string, hashPassword: string): Promise<boolean> {
    await bcrypt.compare(password, hashPassword)
    return null
  }
}
