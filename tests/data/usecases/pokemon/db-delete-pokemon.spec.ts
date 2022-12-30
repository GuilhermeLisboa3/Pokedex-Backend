import { pokemonParams } from '@/tests/mocks'
import { CheckPokemonByIdRepositorySpy, DeletePokemonByIdRepositorySpy } from '@/tests/data/mocks'
import { DbDeletePokemon } from '@/data/usecase'

const { idPokemon, accountId } = pokemonParams

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
    await sut.delete(idPokemon, accountId)
    expect(checkPokemonByIdRepositorySpy.idPokemon).toBe(idPokemon)
    expect(checkPokemonByIdRepositorySpy.accountId).toBe(accountId)
  })

  it('should return null if CheckPokemonByIdRepository returns false', async () => {
    const { sut, checkPokemonByIdRepositorySpy } = makeSut()
    checkPokemonByIdRepositorySpy.result = false
    const error = await sut.delete(idPokemon, accountId)
    expect(error).toBeNull()
  })

  it('should thorw if CheckPokemonByIdRepository returns thorws', async () => {
    const { sut, checkPokemonByIdRepositorySpy } = makeSut()
    jest.spyOn(checkPokemonByIdRepositorySpy, 'checkById').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.delete(idPokemon, accountId)
    await expect(promise).rejects.toThrow()
  })

  it('should call DeletePokemonByIdRepository with correct id', async () => {
    const { sut, deletePokemonByIdRepositorySpy } = makeSut()
    await sut.delete(idPokemon, accountId)
    expect(deletePokemonByIdRepositorySpy.idPokemon).toBe(idPokemon)
    expect(deletePokemonByIdRepositorySpy.accountId).toBe(accountId)
  })

  it('should throw if DeletePokemonByIdRepository returns throws', async () => {
    const { sut, deletePokemonByIdRepositorySpy } = makeSut()
    jest.spyOn(deletePokemonByIdRepositorySpy, 'deleteById').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.delete(idPokemon, accountId)
    await expect(promise).rejects.toThrow()
  })

  it('should return true on success', async () => {
    const { sut } = makeSut()
    const deleteAccount = await sut.delete(idPokemon, accountId)
    expect(deleteAccount).toBe(true)
  })
})
