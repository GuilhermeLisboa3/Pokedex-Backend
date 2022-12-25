import request from 'supertest'
import { sequelize, Account } from '@/infra/database/postgres/entities'
import { app } from '@/main/config/app'
import { accountParams } from '@/tests/mocks'
import { hash } from 'bcrypt'
import { AccessDeniedError } from '@/presentation/errors'
import env from '@/main/config/env'
import { sign } from 'jsonwebtoken'

const { name, email, password } = accountParams

const makeAccessToken = async (): Promise<string> => {
  await Account.create({
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'any_password'
  })
  const { id } = await Account.findOne({ where: { email: 'any_email@email.com' } })
  const accessToken = sign({ id }, env.jwtSecret)
  return accessToken
}

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
      const accessToken = await makeAccessToken()
      await request(app)
        .delete('/user')
        .set({ authorization: `Bearer ${accessToken}` })
        .expect(204)
    })

    it('should return 403 if accessToken is invalid ', async () => {
      const { status, body: { error } } = await request(app)
        .delete('/user')
        .set({ authorization: 'Bearer any_token' })
      expect(status).toBe(403)
      expect(error).toEqual(new AccessDeniedError().message)
    })
  })
})
