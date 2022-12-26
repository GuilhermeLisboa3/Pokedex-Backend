import { pokemonParams } from '@/tests/mocks'
import { CheckPokemonRepositorySpy } from '@/tests/data/mocks'
import { DbAddPokemon } from '@/data/usecase'

const { accountId, namePokemon } = pokemonParams
const makeRequest = {
  namePokemon,
  photoPokemon: pokemonParams.photoPokemon,
  idPokemon: pokemonParams.idPokemon,
  types: pokemonParams.types,
  urlSpecies: pokemonParams.urlSpecies
}

type SutTypes = {
  sut: DbAddPokemon
  checkPokemonRepositorySpy: CheckPokemonRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkPokemonRepositorySpy = new CheckPokemonRepositorySpy()
  const sut = new DbAddPokemon(checkPokemonRepositorySpy)
  return {
    sut,
    checkPokemonRepositorySpy
  }
}

describe('DbAddPokemon', () => {
  it('should call CheckPokemonRepository with correct values ', async () => {
    const { sut, checkPokemonRepositorySpy } = makeSut()
    await sut.add(makeRequest, accountId)
    expect(checkPokemonRepositorySpy.accountId).toBe(accountId)
    expect(checkPokemonRepositorySpy.namePokemon).toBe(namePokemon)
  })

  it('should return false if CheckPokemonRepository return true ', async () => {
    const { sut, checkPokemonRepositorySpy } = makeSut()
    checkPokemonRepositorySpy.result = true
    const httpResponse = await sut.add(makeRequest, accountId)
    expect(httpResponse).toBeFalsy()
  })

  it('should throw if CheckPokemonRepository returns throws', async () => {
    const { sut, checkPokemonRepositorySpy } = makeSut()
    jest.spyOn(checkPokemonRepositorySpy, 'checkPokemon').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.add(makeRequest, accountId)
    await expect(promise).rejects.toThrow()
  })
})
