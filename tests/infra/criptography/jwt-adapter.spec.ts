import jwt from 'jsonwebtoken'
import { JwtAdapter } from '@/infra/criptography'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return Promise.resolve('valid_token')
  },
  async verify (): Promise<string> {
    return Promise.resolve('any_id')
  }
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret', '7d')
}

describe('jsonWebToken Adapter', () => {
  describe('encrypt()', () => {
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

    it('should throw if sign returns throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => { throw new Error() })
      const promise = sut.encrypt('any_id')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('decrypt()', () => {
    it('should call encrypt with correct values', async () => {
      const sut = makeSut()
      const verifySpy = jest.spyOn(jwt, 'verify')
      await sut.decrypt('any_id')
      expect(verifySpy).toHaveBeenCalledWith('any_id', 'secret', expect.any(Function))
    })

    it('should return accountId on success', async () => {
      const sut = makeSut()
      const accountId = await sut.decrypt('any_id')
      expect(accountId).toBe('any_id')
    })

    it('should throw if encrypt returns throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'verify').mockImplementationOnce(() => { throw new Error() })
      const promise = sut.decrypt('any_id')
      await expect(promise).rejects.toThrow()
    })
  })
})
