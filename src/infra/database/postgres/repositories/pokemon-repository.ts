import { CheckPokemonRepository, AddPokemonRepository, ListPokemonsRepository } from '@/data/protocols'
import { Pokemon } from '@/infra/database/postgres/entities'

export class PokemonRepository implements CheckPokemonRepository, AddPokemonRepository, ListPokemonsRepository {
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
    console.log(pokemons)
    return pokemons
  }
}
