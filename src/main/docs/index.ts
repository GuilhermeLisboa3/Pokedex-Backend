import { registerPath, loginPath, DeleteAccountPath, AddPokemonPath, ListPokemonsPath, DeletePokemonPath } from './path'
import { registerSchema, registerParamsSchema, errorSchema, loginParamsSchema, loginSchema, pokemonParamsSchema, listPokemonsSchema } from './schemas'
import { badRequest, forbidden, serverError, notFound, unauthorized, securitySchemes } from './components'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Pokedex Pokemon Node',
    description: 'API de uma pokedex, que serve para criar um usuario e salvar seus pokemons na sua conta.',
    version: '1.0.0',
    contact: {
      name: 'Guilherme Gonçalves Lisboa',
      email: 'Guime0162@gmail.com',
      url: 'https://www.linkedin.com/in/guilherme-gon%C3%A7alves-lisboa-abb8b0227/'
    }
  },
  servers: [{
    url: '/'
  }],
  tags: [{ name: 'User' }, { name: 'Pokemon' }],
  paths: {
    '/register': registerPath,
    '/login': loginPath,
    '/user': DeleteAccountPath,
    '/pokemon': AddPokemonPath,
    '/pokemons': ListPokemonsPath,
    '/pokemon/{id}': DeletePokemonPath
  },
  schemas: {
    register: registerSchema,
    registerParams: registerParamsSchema,
    loginParams: loginParamsSchema,
    login: loginSchema,
    pokemonParams: pokemonParamsSchema,
    listPokemons: listPokemonsSchema,
    error: errorSchema
  },
  components: {
    badRequest,
    forbidden,
    serverError,
    notFound,
    unauthorized,
    securitySchemes
  }
}
