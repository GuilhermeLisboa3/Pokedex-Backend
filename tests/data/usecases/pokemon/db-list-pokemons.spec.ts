import { pokemonParams } from '@/tests/mocks'
import { ListPokemonsRepositorySpy } from '@/tests/data/mocks'
import { DbListPokemons } from '@/data/usecase'

const { accountId } = pokemonParams

type SutTypes = {
  sut: DbListPokemons
  listPokemonsRepositorySpy: ListPokemonsRepositorySpy
}

const makeSut = (): SutTypes => {
  const listPokemonsRepositorySpy = new ListPokemonsRepositorySpy()
  const sut = new DbListPokemons(listPokemonsRepositorySpy)
  return {
    sut,
    listPokemonsRepositorySpy
  }
}

describe('DbListPokemons', () => {
  it('should call ListPokemonsRepository with correct accountId ', async () => {
    const { sut, listPokemonsRepositorySpy } = makeSut()
    await sut.list(accountId)
    expect(listPokemonsRepositorySpy.accountId).toBe(accountId)
  })

  it('should return list pokemons on success', async () => {
    const { sut, listPokemonsRepositorySpy } = makeSut()
    const pokemons = await sut.list(accountId)
    expect(pokemons).toEqual(listPokemonsRepositorySpy.result)
  })

  it('should throw if ListPokemonsRepository returns throws', async () => {
    const { sut, listPokemonsRepositorySpy } = makeSut()
    jest.spyOn(listPokemonsRepositorySpy, 'list').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.list(accountId)
    await expect(promise).rejects.toThrow()
  })
})
