import { pokemonParams } from '@/tests/mocks'
import { DeletePokemonSpy } from '@/tests/presentation/mocks'
import { DeletePokemonController } from '@/presentation/controllers'

const { idPokemon } = pokemonParams

type SutTypes = {
  sut: DeletePokemonController
  deletePokemonSpy: DeletePokemonSpy
}

const makeSut = (): SutTypes => {
  const deletePokemonSpy = new DeletePokemonSpy()
  const sut = new DeletePokemonController(deletePokemonSpy)
  return {
    sut,
    deletePokemonSpy
  }
}

describe('deletePokemon Controller', () => {
  it('should call DeletePokemon with correct id', async () => {
    const { sut, deletePokemonSpy } = makeSut()
    await sut.handle({ id: idPokemon })
    expect(deletePokemonSpy.idPokemon).toBe(idPokemon)
  })
})
