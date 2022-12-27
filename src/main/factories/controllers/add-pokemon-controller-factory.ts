import { makePokemonValidation } from '@/main/factories/controllers'
import { AddPokemonController } from '@/presentation/controllers/add-pokemon-controller'
import { Controller } from '@/presentation/protocols'
import { DbAddPokemon } from '@/data/usecase'
import { PokemonRepository } from '@/infra/database/postgres/repositories'

export const makeAddPokemonController = (): Controller => {
  const pokemonRepository = new PokemonRepository()
  const dbAddPokemon = new DbAddPokemon(pokemonRepository, pokemonRepository)
  return new AddPokemonController(makePokemonValidation(), dbAddPokemon)
}
