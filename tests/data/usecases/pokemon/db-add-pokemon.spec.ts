import { pokemonParams } from '@/tests/mocks'
import { CheckPokemonByIdRepositorySpy, AddPokemonRepositorySpy } from '@/tests/data/mocks'
import { DbAddPokemon } from '@/data/usecase'

const { accountId, idPokemon } = pokemonParams
const makeRequest = {
  idPokemon: pokemonParams.idPokemon
}

type SutTypes = {
  sut: DbAddPokemon
  checkPokemonRepositorySpy: CheckPokemonByIdRepositorySpy
  addPokemonRepositorySpy: AddPokemonRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkPokemonRepositorySpy = new CheckPokemonByIdRepositorySpy()
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
    expect(checkPokemonRepositorySpy.idPokemon).toBe(idPokemon)
  })

  it('should return false if CheckPokemonRepository return true ', async () => {
    const { sut } = makeSut()
    const isValid = await sut.add(makeRequest, accountId)
    expect(isValid).toBeFalsy()
  })

  it('should throw if CheckPokemonRepository returns throws', async () => {
    const { sut, checkPokemonRepositorySpy } = makeSut()
    jest.spyOn(checkPokemonRepositorySpy, 'checkById').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.add(makeRequest, accountId)
    await expect(promise).rejects.toThrow()
  })

  it('should call AddPokemonRepository with correct values ', async () => {
    const { sut, addPokemonRepositorySpy, checkPokemonRepositorySpy } = makeSut()
    checkPokemonRepositorySpy.result = false
    await sut.add(makeRequest, accountId)
    expect(addPokemonRepositorySpy.addPokemonParams).toEqual({ ...makeRequest, accountId })
  })

  it('should return false if AddPokemonRepository returns false', async () => {
    const { sut, addPokemonRepositorySpy, checkPokemonRepositorySpy } = makeSut()
    checkPokemonRepositorySpy.result = false
    addPokemonRepositorySpy.result = false
    const isValid = await sut.add(makeRequest, accountId)
    expect(isValid).toBeFalsy()
  })

  it('should throw if AddPokemonRepository returns throws', async () => {
    const { sut, addPokemonRepositorySpy, checkPokemonRepositorySpy } = makeSut()
    checkPokemonRepositorySpy.result = false
    jest.spyOn(addPokemonRepositorySpy, 'add').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.add(makeRequest, accountId)
    await expect(promise).rejects.toThrow()
  })

  it('should return true if on success', async () => {
    const { sut, checkPokemonRepositorySpy } = makeSut()
    checkPokemonRepositorySpy.result = false
    const isValid = await sut.add(makeRequest, accountId)
    expect(isValid).toBeTruthy()
  })
})
