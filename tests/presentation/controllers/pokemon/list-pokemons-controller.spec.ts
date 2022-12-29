import { pokemonParams } from '@/tests/mocks'
import { ListPokemonsSpy } from '@/tests/presentation/mocks'
import { ListPokemonsController } from '@/presentation/controllers'
import { ok, serverError } from '@/presentation/helpers'

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

  it('should return list pokemons on success', async () => {
    const { sut, listPokemonsSpy } = makeSut()
    const pokemons = await sut.handle({ accountId })
    expect(pokemons).toEqual(ok(listPokemonsSpy.result))
  })

  it('should return 500 if ListPokemons returns throws ', async () => {
    const { sut, listPokemonsSpy } = makeSut()
    jest.spyOn(listPokemonsSpy, 'list').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle({ accountId })
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
