import { pokemonParams } from '@/tests/mocks'
import { CheckPokemonByIdRepositorySpy, DeletePokemonByIdRepositorySpy } from '@/tests/data/mocks'
import { DbDeletePokemon } from '@/data/usecase'

const { idPokemon } = pokemonParams

type SutTypes = {
  sut: DbDeletePokemon
  checkPokemonByIdRepositorySpy: CheckPokemonByIdRepositorySpy
  deletePokemonByIdRepositorySpy: DeletePokemonByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkPokemonByIdRepositorySpy = new CheckPokemonByIdRepositorySpy()
  const deletePokemonByIdRepositorySpy = new DeletePokemonByIdRepositorySpy()
  const sut = new DbDeletePokemon(checkPokemonByIdRepositorySpy, deletePokemonByIdRepositorySpy)

  return {
    sut,
    checkPokemonByIdRepositorySpy,
    deletePokemonByIdRepositorySpy
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

  it('should thorw if CheckPokemonByIdRepository returns thorws', async () => {
    const { sut, checkPokemonByIdRepositorySpy } = makeSut()
    jest.spyOn(checkPokemonByIdRepositorySpy, 'checkById').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.delete(idPokemon)
    await expect(promise).rejects.toThrow()
  })

  it('should call DeletePokemonByIdRepository with correct id', async () => {
    const { sut, deletePokemonByIdRepositorySpy } = makeSut()
    await sut.delete(idPokemon)
    expect(deletePokemonByIdRepositorySpy.idPokemon).toBe(idPokemon)
  })

  it('should throw if DeletePokemonByIdRepository returns throws', async () => {
    const { sut, deletePokemonByIdRepositorySpy } = makeSut()
    jest.spyOn(deletePokemonByIdRepositorySpy, 'deleteById').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.delete(idPokemon)
    await expect(promise).rejects.toThrow()
  })
})
