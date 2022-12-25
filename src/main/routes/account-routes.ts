import { Router } from 'express'
import { adaptRoute, adaptMiddleware } from '@/main/adapters'
import { makeSingUpController, makeLoginController, makeDeleteAccountController } from '@/main/factories/controllers'
import { makeAuthMiddleware } from '@/main/factories/middlewares'

export default (router: Router): void => {
  router.post('/register', adaptRoute(makeSingUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
  router.delete('/user', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeDeleteAccountController()))
}
