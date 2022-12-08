import request from 'supertest'
import app from '@/main/config/app'
import { accountParams } from '@/tests/mocks'

const { name, email, password } = accountParams

describe('SignUp Routes', () => {
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
