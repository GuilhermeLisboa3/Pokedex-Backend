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
  it('should call CheckPokemonByIdRepository with correct id', async () => {
    const { sut, checkPokemonByIdRepositorySpy } = makeSut()
    await sut.delete(idPokemon)
    expect(checkPokemonByIdRepositorySpy.idPokemon).toBe(idPokemon)
  })

  it('should return null if CheckPokemonByIdRepository returns false', async () => {
    const { sut, checkPokemonByIdRepositorySpy } = makeSut()
    checkPokemonByIdRepositorySpy.result = false
    const error = await sut.delete(idPokemon)
    expect(error).toBeNull()
  })
})
