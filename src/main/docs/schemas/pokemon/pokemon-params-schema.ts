export const pokemonParamsSchema = {
  type: 'object',
  properties: {
    idPokemon: {
      type: 'string'
    },
    namePokemon: {
      type: 'string'
    },
    photoPokemon: {
      type: 'string'
    },
    urlSpecies: {
      type: 'string'
    },
    types: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  },
  required: ['namePokemon', 'photoPokemon', 'types', 'idPokemon', 'urlSpecies']
}
