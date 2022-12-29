import { pokemonParams } from '@/tests/mocks'
import { DeletePokemonSpy } from '@/tests/presentation/mocks'
import { DeletePokemonController } from '@/presentation/controllers'
import { badRequest, serverError } from '@/presentation/helpers'
import { NonExistentFieldError } from '@/presentation/errors'

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

  it('should return badRequest if DeletePokemon returns null', async () => {
    const { sut, deletePokemonSpy } = makeSut()
    deletePokemonSpy.result = null
    const error = await sut.handle({ id: idPokemon })
    expect(error).toEqual(badRequest(new NonExistentFieldError('idPokemon')))
  })

  it('should return 500 if DeletePokemon returns throws', async () => {
    const { sut, deletePokemonSpy } = makeSut()
    jest.spyOn(deletePokemonSpy, 'delete').mockImplementationOnce(() => { throw new Error() })
    const error = await sut.handle({ id: idPokemon })
    expect(error).toEqual(serverError(new Error()))
  })
})
