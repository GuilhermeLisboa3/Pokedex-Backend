import { MissingParamError } from '@/presentation/errors'
import { RequiredFieldValidation } from '@/validations/validators'
import { faker } from '@faker-js/faker'

const field = faker.random.word()

type SutTypes = {
  sut: RequiredFieldValidation
}

const makeSut = (): SutTypes => {
  const sut = new RequiredFieldValidation(field)
  return {
    sut
  }
}

describe('Required Field Validation', () => {
  it('should return MissingParamError if validation  fails', () => {
    const { sut } = makeSut()
    const error = sut.validate({ invalidField: field })
    expect(error).toEqual(new MissingParamError(field))
  })

  it('should not return if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toBeFalsy()
  })
})
