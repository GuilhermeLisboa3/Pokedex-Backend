export const loginSchema = {
  type: 'object',
  properties: {
    token: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    email: {
      type: 'string'
    }
  }
}
