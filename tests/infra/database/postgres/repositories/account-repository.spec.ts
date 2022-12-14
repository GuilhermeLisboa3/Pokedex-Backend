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

  describe('loadByEmail()', () => {
    it('should return an account on success', async () => {
      const sut = makeSut()
      await Account.create({ name, email, password })
      const account = await sut.loadByEmail(email)

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(name)
      expect(account.password).toBe(password)
    })

    it('should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail(email)
      expect(account).toBeFalsy()
    })
  })

  describe('deleteById()', () => {
    it('should delete account on success', async () => {
      const sut = makeSut()
      await Account.create({ name, email, password })
      const { id } = await Account.findOne({ where: { email } })
      await sut.deleteById(id)

      expect(await Account.findOne({ where: { id } })).toBeNull()
    })
  })

  describe('checkById()', () => {
    it('should return true if id valid', async () => {
      const sut = makeSut()
      await Account.create({ name, email, password })
      const { id } = await Account.findOne({ where: { email } })
      const account = await sut.checkById(id)

      expect(account).toBe(true)
    })

    it('should return false if id is invalid', async () => {
      const sut = makeSut()
      await Account.create({ name, email, password })
      const { id } = await Account.findOne({ where: { email } })
      await Account.destroy({ where: { id } })
      const account = await sut.checkById(id)

      expect(account).toBe(false)
    })
  })

  describe('loadById()', () => {
    it('should return an account on success', async () => {
      const sut = makeSut()
      await Account.create({ name, email, password })
      const { id } = await Account.findOne({ where: { email } })
      const account = await sut.loadById(id)

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(name)
      expect(account.email).toBe(email)
    })

    it('should return null if loadById fails', async () => {
      const sut = makeSut()
      await Account.create({ name, email, password })
      const { id } = await Account.findOne({ where: { email } })
      await Account.destroy({ where: { id } })
      const account = await sut.loadById(id)
      expect(account).toBeFalsy()
    })
  })
})
