import { pokemonParams } from '@/tests/mocks'
import { ValidationSpy, AddPokemonSpy } from '@/tests/presentation/mocks'
import { AddPokemonController } from '@/presentation/controllers'
import { badRequest, forbidden, serverError, ok } from '@/presentation/helpers'
import { PokemonInUseError } from '@/presentation/errors'

const { accountId, namePokemon, photoPokemon, idPokemon, types, urlSpecies } = pokemonParams
const makeRequest = {
  namePokemon,
  photoPokemon,
  idPokemon,
  types,
  urlSpecies,
  accountId
}

type SutTypes = {
  sut: AddPokemonController
  validationSpy: ValidationSpy
  addPokemonSpy: AddPokemonSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addPokemonSpy = new AddPokemonSpy()
  const sut = new AddPokemonController(validationSpy, addPokemonSpy)
  return {
    sut,
    validationSpy,
    addPokemonSpy
  }
}

describe('AddPokemon Controller', () => {
  it('should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    await sut.handle(makeRequest)
    expect(validationSpy.input).toEqual(makeRequest)
  })

  it('should return 400 if Validation returns in error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(makeRequest)
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  it('should call AddPokemon with correct value ', async () => {
    const { sut, addPokemonSpy } = makeSut()
    await sut.handle(makeRequest)
    expect(addPokemonSpy.addPokemonParams).toEqual({
      namePokemon,
      photoPokemon,
      idPokemon,
      types,
      urlSpecies
    })
    expect(addPokemonSpy.accountId).toEqual(accountId)
  })

  it('should return 403 if AddPokemon returns null ', async () => {
    const { sut, addPokemonSpy } = makeSut()
    addPokemonSpy.result = false
    const httpResponse = await sut.handle(makeRequest)
    expect(httpResponse).toEqual(forbidden(new PokemonInUseError()))
  })

  it('should return 500 if AddPokemon returns throws ', async () => {
    const { sut, addPokemonSpy } = makeSut()
    jest.spyOn(addPokemonSpy, 'add').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(makeRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('should return 200 on success ', async () => {
    const { sut, addPokemonSpy } = makeSut()
    const httpResponse = await sut.handle(makeRequest)
    expect(httpResponse).toEqual(ok(addPokemonSpy.result))
  })
})
