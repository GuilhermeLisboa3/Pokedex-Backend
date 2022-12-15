import jwt from 'jsonwebtoken'
import { JwtAdapter } from '@/infra/criptography'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return Promise.resolve('token')
  }
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret', '7d')
}

describe('jsonWebToken Adapter', () => {
  it('should call sign with correct value', async () => {
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id')
    expect(signSpy).toHaveBeenCalledWith('any_id', 'secret', { expiresIn: '7d' })
  })
})
