import { Controller } from '@/presentation/protocols'
import { ListPokemonsController } from '@/presentation/controllers/pokemon'
import { DbListPokemons } from '@/data/usecase/pokemon'
import { PokemonRepository } from '@/infra/database/postgres/repositories'

export const makeListPokemonsController = (): Controller => {
  const pokemonRepository = new PokemonRepository()
  const dbListPokemons = new DbListPokemons(pokemonRepository)
  return new ListPokemonsController(dbListPokemons)
}
