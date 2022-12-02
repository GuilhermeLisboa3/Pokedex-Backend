import { EmailValidationSpy } from '../mocks/mock-email-validation'
import { EmailValidation } from '@/validations/validators'
import { InvalidParamError } from '@/presentation/errors'
import { faker } from '@faker-js/faker'

const field = faker.random.word()

type SutTypes = {
  sut: EmailValidation
  emailValidationSpy: EmailValidationSpy
}

const makeSut = (): SutTypes => {
  const emailValidationSpy = new EmailValidationSpy()
  const sut = new EmailValidation(field, emailValidationSpy)
  return {
    sut,
    emailValidationSpy
  }
}

describe('Email Validation', () => {
  it('should call EmailValidator if correct value', () => {
    const { sut, emailValidationSpy } = makeSut()
    const email = faker.internet.email()
    sut.validate({ [field]: email })
    expect(emailValidationSpy.email).toEqual(email)
  })

  it('should return an error if EmailValidator returns false', () => {
    const { sut, emailValidationSpy } = makeSut()
    const email = faker.internet.email()
    emailValidationSpy.isEmailValid = false
    const error = sut.validate({ [field]: email })
    expect(error).toEqual(new InvalidParamError(field))
  })
})
