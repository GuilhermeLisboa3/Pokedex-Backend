export const badRequest = {
  description: 'Requisição inválida',
  content: { 'application/json': { schema: { $ref: '#/schemas/error' } } }
}

export const forbidden = {
  description: 'Acesso negado',
  content: { 'application/json': { schema: { $ref: '#/schemas/error' } } }
}

export const notFound = {
  description: 'API não encontrada.'
}

export const serverError = {
  description: 'Problema no servidor',
  content: { 'application/json': { schema: { $ref: '#/schemas/error' } } }
}

export const unauthorized = {
  description: 'Credenciais inválidas',
  content: { 'application/json': { schema: { $ref: '#/schemas/error' } } }
}
