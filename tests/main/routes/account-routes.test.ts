import request from 'supertest'
import { sequelize, Account } from '@/infra/database/postgres/entities'
import { app } from '@/main/config/app'
import { accountParams } from '@/tests/mocks'
import { hash } from 'bcrypt'
import { NonExistentFieldError } from '@/presentation/errors'

const { name, email, password } = accountParams

describe('SignUp Routes', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })
  afterAll(async () => {
    await sequelize.close()
  })
  describe('/register', () => {
    it('should return an account on sucess ', async () => {
      await request(app)
        .post('/register')
        .send({
          name,
          email,
          password
        })
        .expect(200)
    })
  })

  describe('/login', () => {
    it('should return 200 on login', async () => {
      const password = await hash('valid_password', 12)
      await Account.create({
        name: 'valid_name',
        email: 'valid_email@email.com',
        password
      })
      await request(app)
        .post('/login')
        .send({
          email: 'valid_email@email.com',
          password: 'valid_password'
        })
        .expect(200)
    })

    it('should return 401 on login', async () => {
      await request(app)
        .post('/login')
        .send({
          email: 'invalid_email@email.com',
          password: 'invalid_password'
        })
        .expect(401)
    })
  })
  describe('/user', () => {
    it('should delete an account on success ', async () => {
      await Account.create({ name, email, password })
      const { id } = await Account.findOne({ where: { email } })
      await request(app)
        .delete('/user')
        .send({ id })
        .expect(204)
    })

    it('should return 400 if no have account with id provided ', async () => {
      await Account.create({ name, email, password })
      const { id } = await Account.findOne({ where: { email } })
      await Account.destroy({ where: { id } })
      const { status, body: { error } } = await request(app)
        .delete('/user')
        .send({ id })
      expect(status).toBe(400)
      expect(error).toEqual(new NonExistentFieldError('id').message)
    })
  })
})