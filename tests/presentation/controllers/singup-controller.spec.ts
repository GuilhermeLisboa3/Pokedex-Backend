import { SingUpController } from '@/presentation/controllers'
import { badRequest } from '@/presentation/helpers'
import { Validation } from '@/presentation/protocols'
import { accountParams } from '@/tests/mocks'

const { name, email, password } = accountParams
const makeRequest = {
  name,
  email,
  password
}

export class ValidationSpy implements Validation {
  error: Error = null
  input: any
  validate (input: any): Error {
    this.input = input
    return this.error
  }
}

type SutTypes = {
  sut: SingUpController
  validation: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validation = new ValidationSpy()
  const sut = new SingUpController(validation)
  return {
    sut,
    validation
  }
}

describe('SingUp Controller', () => {
  it('should call Validation with correct value ', () => {
    const { sut, validation } = makeSut()
    sut.handle(makeRequest)
    expect(validation.input).toEqual(makeRequest)
  })

  it('should return 400 if Validation returns in error', () => {
    const { sut, validation } = makeSut()
    validation.error = new Error()
    const httpResponse = sut.handle(makeRequest)
    expect(httpResponse).toEqual(badRequest(validation.error))
  })
})
