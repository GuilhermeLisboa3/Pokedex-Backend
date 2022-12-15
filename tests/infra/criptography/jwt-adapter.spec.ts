import jwt from 'jsonwebtoken'
import { JwtAdapter } from '@/infra/criptography'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return Promise.resolve('valid_token')
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
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret', { expiresIn: '7d' })
  })

  it('should return a token on sign success', async () => {
    const sut = makeSut()
    const token = await sut.encrypt('any_id')
    expect(token).toBe('valid_token')
  })
})
