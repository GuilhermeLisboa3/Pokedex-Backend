import { ValidationSpy } from '@/tests/presentation/mocks'
import { ValidationComposite } from '@/validations/validators'
import { faker } from '@faker-js/faker'

const field = faker.random.word()

type SutTypes = {
  sut: ValidationComposite
  validationSpies: ValidationSpy[]
}

const makeSut = (): SutTypes => {
  const validationSpies = [
    new ValidationSpy(),
    new ValidationSpy()
  ]
  const sut = new ValidationComposite(validationSpies)
  return {
    sut,
    validationSpies
  }
}

describe('Validation Composite', () => {
  it('should return an error if any validation fails', () => {
    const { sut, validationSpies } = makeSut()
    validationSpies[1].error = new Error(field)
    const error = sut.validate({ field })
    expect(error).toEqual(validationSpies[1].error)
  })

  it('should return the first error if more then one validation fails', () => {
    const { sut, validationSpies } = makeSut()
    validationSpies[0].error = new Error(field)
    validationSpies[1].error = new Error('email')
    const error = sut.validate({ field })
    expect(error).toEqual(validationSpies[0].error)
  })
})
