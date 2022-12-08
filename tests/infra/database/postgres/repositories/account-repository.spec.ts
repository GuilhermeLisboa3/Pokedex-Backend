import { sequelize, Account } from '@/infra/database/postgres/entities'
import { AccountRepository } from '@/infra/database/postgres/repositories'
import { accountParams } from '@/tests/mocks'

const { name, email, password } = accountParams

const makeSut = (): AccountRepository => {
  return new AccountRepository()
}

describe('Account Repository', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })
  afterAll(async () => {
    await sequelize.close()
  })
  describe('checkByEmail', () => {
    it('should return true if email exist', async () => {
      const sut = makeSut()
      await Account.create({ name, email, password })
      const account = await sut.checkByEmail(email)
      expect(account).toBe(true)
    })

    it('should return false if email not exist', async () => {
      const sut = makeSut()
      const account = await sut.checkByEmail(email)
      expect(account).toBe(false)
    })
  })

  describe('add', () => {
    it('should return an account on success', async () => {
      const sut = makeSut()
      const account = await sut.add({ name, email, password })
      expect(account).toBe(true)
    })
  })
})
