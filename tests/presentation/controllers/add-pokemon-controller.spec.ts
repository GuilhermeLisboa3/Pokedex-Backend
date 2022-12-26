import { pokemonParams } from '@/tests/mocks'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { AddPokemonController } from '@/presentation/controllers'
import { badRequest } from '@/presentation/helpers'

const makeRequest = {
  namePokemon: pokemonParams.namePokemon,
  photoPokemon: pokemonParams.photoPokemon,
  idPokemon: pokemonParams.idPokemon,
  types: pokemonParams.types,
  urlSpecies: pokemonParams.urlSpecies,
  IdUser: pokemonParams.IdUser
}

type SutTypes = {
  sut: AddPokemonController
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new AddPokemonController(validationSpy)
  return {
    sut,
    validationSpy
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
})
