import { Router } from 'express'
import { adaptRoute, adaptMiddleware } from '@/main/adapters'
import { makeAddPokemonController } from '@/main/factories/controllers'
import { makeAuthMiddleware } from '@/main/factories/middlewares'

export default (router: Router): void => {
  router.post('/pokemon', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeAddPokemonController()))
}
