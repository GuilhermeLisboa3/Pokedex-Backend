import { DeletePokemonController } from '@/presentation/controllers/pokemon'
import { DbDeletePokemon } from '@/data/usecase'
import { PokemonRepository } from '@/infra/database/postgres/repositories'
import { Controller } from '@/presentation/protocols'

export const makeDeletePokemonController = (): Controller => {
  const pokemonRepository = new PokemonRepository()
  const dbDeletePokemon = new DbDeletePokemon(pokemonRepository, pokemonRepository)
  return new DeletePokemonController(dbDeletePokemon)
}
