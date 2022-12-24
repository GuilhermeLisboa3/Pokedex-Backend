import { Encrypter, Decrypter } from '@/data/protocols'
import jwt, { JwtPayload } from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (
    private readonly secret: string,
    private readonly expires: string
  ) {}

  async encrypt (plaintext: string): Promise<string> {
    const token = await jwt.sign({ id: plaintext }, this.secret, { expiresIn: this.expires })
    return token
  }

  async decrypt (plaintext: string): Promise<string> {
    const accountId: any = await jwt.verify(plaintext, this.secret, (err, decoded) => {
      if (err || typeof decoded === 'undefined') {
        return null
      }
      return (decoded as JwtPayload).id
    })
    return accountId
  }
}
