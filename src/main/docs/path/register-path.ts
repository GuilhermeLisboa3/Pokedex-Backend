export const registerPath = {
  post: {
    tags: ['User'],
    summary: 'Rota para criar um usuário.',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/registerParams'
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
              $ref: '#/schemas/register'
            }
          }
        }
      }
    }
  }
}
