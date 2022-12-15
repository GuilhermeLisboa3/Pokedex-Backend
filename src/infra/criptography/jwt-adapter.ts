import { Encrypter } from '@/data/protocols'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  constructor (
    private readonly secret: string,
    private readonly expires: string
  ) {}

  async encrypt (plaintext: string): Promise<string> {
    await jwt.sign({ id: plaintext }, this.secret, { expiresIn: this.expires })
    return null
  }
}
