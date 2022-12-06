import { Hasher } from '@/data/protocols'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher {
  constructor (private readonly salt: number) {}

  async hash (password: string): Promise<string> {
    await bcrypt.hash(password, this.salt)
    return null
  }
}
