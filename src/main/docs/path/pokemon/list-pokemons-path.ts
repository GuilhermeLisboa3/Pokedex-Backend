export const ListPokemonsPath = {
  get: {
    security: [{ bearerAuth: [] }],
    tags: ['Pokemon'],
    summary: 'Api para listar todos os pokemons do usuário.',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/listPokemons'
            }
          }
        }
      },
      403: {
        $ref: '#/components/forbidden'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
