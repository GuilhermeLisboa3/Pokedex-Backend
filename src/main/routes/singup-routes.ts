import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeSingUpController } from '@/main/factories/controllers/singup-controller-factory'

export default (router: Router): void => {
  router.post('/register', adaptRoute(makeSingUpController()))
}
