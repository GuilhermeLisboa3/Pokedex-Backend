import { pokemonParams } from '@/tests/mocks'
import { DeletePokemonSpy } from '@/tests/presentation/mocks'
import { DeletePokemonController } from '@/presentation/controllers'
import { badRequest, noContent, serverError } from '@/presentation/helpers'
import { NonExistentFieldError } from '@/presentation/errors'

const { idPokemon, accountId } = pokemonParams

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
    await sut.handle({ id: idPokemon, accountId })
    expect(deletePokemonSpy.idPokemon).toBe(idPokemon)
    expect(deletePokemonSpy.accountId).toBe(accountId)
  })

  it('should return badRequest if DeletePokemon returns null', async () => {
    const { sut, deletePokemonSpy } = makeSut()
    deletePokemonSpy.result = null
    const error = await sut.handle({ id: idPokemon, accountId })
    expect(error).toEqual(badRequest(new NonExistentFieldError('idPokemon')))
  })

  it('should return 500 if DeletePokemon returns throws', async () => {
    const { sut, deletePokemonSpy } = makeSut()
    jest.spyOn(deletePokemonSpy, 'delete').mockImplementationOnce(() => { throw new Error() })
    const error = await sut.handle({ id: idPokemon, accountId })
    expect(error).toEqual(serverError(new Error()))
  })

  it('should return 200 on success', async () => {
    const { sut } = makeSut()
    const deletePokemon = await sut.handle({ id: idPokemon, accountId })
    expect(deletePokemon).toEqual(noContent())
  })
})
