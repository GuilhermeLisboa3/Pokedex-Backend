import request from 'supertest'
import { sequelize } from '@/infra/database/postgres/entities'
import { app } from '@/main/config/app'
import { accountParams } from '@/tests/mocks'

const { name, email, password } = accountParams

describe('SignUp Routes', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })
  afterAll(async () => {
    await sequelize.close()
  })
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
