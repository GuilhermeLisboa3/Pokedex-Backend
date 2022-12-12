import request from 'supertest'
import { app } from '@/main/config/app'

describe('Cors Middleware', () => {
  it('should enable Cors ', async () => {
    app.get('/test_cors', (req, res) => {
      res.send()
    })
    await request(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
