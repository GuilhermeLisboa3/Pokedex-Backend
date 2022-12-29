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
})
