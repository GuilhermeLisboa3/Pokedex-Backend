export const DeleteAccountPath = {
  delete: {
    security: [{ bearerAuth: [] }],
    tags: ['User'],
    summary: 'Api para deletar usuário.',
    responses: {
      204: {
        description: 'Sucesso'
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
