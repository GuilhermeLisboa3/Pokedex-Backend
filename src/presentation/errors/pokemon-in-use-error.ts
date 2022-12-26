export class PokemonInUseError extends Error {
  constructor () {
    super('The received pokemon is already in use')
    this.name = 'PokemonInUseError'
  }
}
