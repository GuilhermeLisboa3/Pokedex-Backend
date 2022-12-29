import { pokemonParams } from '@/tests/mocks'
import { ListPokemonsSpy } from '@/tests/presentation/mocks'
import { ListPokemonsController } from '@/presentation/controllers'

const { accountId } = pokemonParams

type SutTypes = {
  sut: ListPokemonsController
  listPokemonsSpy: ListPokemonsSpy
}

const makeSut = (): SutTypes => {
  const listPokemonsSpy = new ListPokemonsSpy()
  const sut = new ListPokemonsController(listPokemonsSpy)
  return {
    sut,
    listPokemonsSpy
  }
}

describe('ListPokemons Controller', () => {
  it('should call ListPokemons with correct accountId', async () => {
    const { sut, listPokemonsSpy } = makeSut()
    await sut.handle({ accountId })
    expect(listPokemonsSpy.accountId).toEqual(accountId)
  })
})
