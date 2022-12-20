import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeSingUpController, makeLoginController, makeDeleteAccountController } from '@/main/factories/controllers'

export default (router: Router): void => {
  router.post('/register', adaptRoute(makeSingUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
  router.delete('/user', adaptRoute(makeDeleteAccountController()))
}
