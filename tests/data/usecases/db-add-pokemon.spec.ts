import { pokemonParams } from '@/tests/mocks'
import { CheckPokemonRepositorySpy, AddPokemonRepositorySpy } from '@/tests/data/mocks'
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
  addPokemonRepositorySpy: AddPokemonRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkPokemonRepositorySpy = new CheckPokemonRepositorySpy()
  const addPokemonRepositorySpy = new AddPokemonRepositorySpy()
  const sut = new DbAddPokemon(checkPokemonRepositorySpy, addPokemonRepositorySpy)
  return {
    sut,
    checkPokemonRepositorySpy,
    addPokemonRepositorySpy
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

  it('should call AddPokemonRepository with correct values ', async () => {
    const { sut, addPokemonRepositorySpy } = makeSut()
    await sut.add(makeRequest, accountId)
    expect(addPokemonRepositorySpy.addPokemonParams).toEqual({ ...makeRequest, accountId })
  })

  it('should return false if AddPokemonRepository returns false', async () => {
    const { sut, addPokemonRepositorySpy } = makeSut()
    addPokemonRepositorySpy.result = false
    const account = await sut.add(makeRequest, accountId)
    expect(account).toBeFalsy()
  })

  it('should throw if AddPokemonRepository returns throws', async () => {
    const { sut, addPokemonRepositorySpy } = makeSut()
    jest.spyOn(addPokemonRepositorySpy, 'add').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.add(makeRequest, accountId)
    await expect(promise).rejects.toThrow()
  })
})
