import { CheckPokemonRepository, AddPokemonRepository, ListPokemonsRepository, CheckPokemonByIdRepository, DeletePokemonByIdRepository } from '@/data/protocols'
import { Pokemon } from '@/infra/database/postgres/entities'

export class PokemonRepository implements CheckPokemonRepository, AddPokemonRepository, ListPokemonsRepository, CheckPokemonByIdRepository, DeletePokemonByIdRepository {
  async checkPokemon (namePokemon: string, accountId: number): Promise<boolean> {
    const pokemon = await Pokemon.findOne({
      where: {
        namePokemon,
        userId: accountId
      }
    })
    return pokemon != null
  }

  async add (pokemonParams: AddPokemonRepository.Params): Promise<boolean> {
    const pokemon = await Pokemon.create({ ...pokemonParams, userId: pokemonParams.accountId })
    return pokemon != null
  }

  async list (accountId: number): Promise<ListPokemonsRepository.Result> {
    const pokemons = await Pokemon.findAll({
      attributes: [
        'id',
        ['id_pokemon', 'idPokemon'],
        ['name_pokemon', 'namePokemon'],
        ['photo_pokemon', 'photoPokemon'],
        'types',
        ['url_species', 'urlSpecies']
      ],
      where: { userId: accountId }
    })
    return pokemons
  }

  async checkById (idPokemon: string, accountId: number): Promise<boolean> {
    const pokemon = await Pokemon.findOne({
      where: {
        idPokemon,
        userId: accountId
      }
    })
    return pokemon != null
  }

  async deleteById (idPokemon: string, accountId: number): Promise<void> {
    await Pokemon.destroy({ where: { idPokemon, userId: accountId } })
  }
}
