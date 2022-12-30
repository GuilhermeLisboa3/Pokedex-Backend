import { Router } from 'express'
import { adaptRoute, adaptMiddleware } from '@/main/adapters'
import { makeAddPokemonController, makeListPokemonsController, makeDeletePokemonController } from '@/main/factories/controllers'
import { makeAuthMiddleware } from '@/main/factories/middlewares'

export default (router: Router): void => {
  router.post('/pokemon', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeAddPokemonController()))
  router.get('/pokemons', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeListPokemonsController()))
  router.delete('/pokemon/:id', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeDeletePokemonController()))
}
