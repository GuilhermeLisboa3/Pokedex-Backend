export const AddPokemonPath = {
  post: {
    security: [{ bearerAuth: [] }],
    tags: ['Pokemon'],
    summary: 'Api para criar pokemon.',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/pokemonParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              type: 'boolean'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
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
