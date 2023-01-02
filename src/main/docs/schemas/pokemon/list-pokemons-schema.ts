export const listPokemonsSchema = {
  type: 'array',
  items: {
    $ref: '#/schemas/pokemonParams'
  }
}
