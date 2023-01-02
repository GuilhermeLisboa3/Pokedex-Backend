import { registerPath } from './path/register-path'
import { registerSchema, registerParamsSchema } from './schemas/account'
export default {
  openapi: '3.0.0',
  info: {
    title: 'Pokedex Pokemon Node',
    description: 'API de uma pokedex, que serve para criar um usuario e salvar seus pokemons na sua conta.',
    version: '1.0.0'
  },
  servers: [{
    url: '/'
  }],
  tags: [{
    name: 'User'
  }],
  paths: {
    '/register': registerPath
  },
  schemas: {
    register: registerSchema,
    registerParams: registerParamsSchema
  }
}