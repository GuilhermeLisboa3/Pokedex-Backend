export const DeletePokemonPath = {
  delete: {
    security: [{ bearerAuth: [] }],
    tags: ['Pokemon'],
    summary: 'Api para deletar o pokemon do usuário.',
    parameters: [{
      in: 'path',
      name: 'id',
      required: true,
      schema: { type: 'string' }
    }],
    responses: {
      204: {
        description: 'Sucesso'
      },
      400: {
        $ref: '#/components/badRequest'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
