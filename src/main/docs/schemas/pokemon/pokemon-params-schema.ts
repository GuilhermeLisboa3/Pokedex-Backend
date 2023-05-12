export const pokemonParamsSchema = {
  type: 'object',
  properties: {
    idPokemon: {
      type: 'string'
    }
  },
  required: ['idPokemon']
}
