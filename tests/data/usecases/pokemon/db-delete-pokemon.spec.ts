import { pokemonParams } from '@/tests/mocks'
import { CheckPokemonByIdRepositorySpy } from '@/tests/data/mocks'
import { DbDeletePokemon } from '@/data/usecase'

const { idPokemon } = pokemonParams

type SutTypes = {
  sut: DbDeletePokemon
  checkPokemonByIdRepositorySpy: CheckPokemonByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkPokemonByIdRepositorySpy = new CheckPokemonByIdRepositorySpy()
  const sut = new DbDeletePokemon(checkPokemonByIdRepositorySpy)

  return {
    sut,
    checkPokemonByIdRepositorySpy
  }
}

describe('DbDeletePokemon', () => {
  it('should call CheckPokemonById with correct id', async () => {
    const { sut, checkPokemonByIdRepositorySpy } = makeSut()
    await sut.delete(idPokemon)
    expect(checkPokemonByIdRepositorySpy.idPokemon).toBe(idPokemon)
  })
})
