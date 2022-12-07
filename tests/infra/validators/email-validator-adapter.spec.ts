import { EmailValidatorAdapter } from '@/infra/validators'
import { accountParams } from '@/tests/mocks'
import validator from 'validator'

const { email } = accountParams

jest.mock('validator', () => ({
  isEmail (email: string): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('EmailValidator Adapter', () => {
  it('should call validator with correct email', () => {
    const sut = makeSut()
    const isValidSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid(email)
    expect(isValidSpy).toHaveBeenCalledWith(email)
  })
  it('should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid(email)
    expect(isValid).toBe(false)
  })
  it('should return true if validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid(email)
    expect(isValid).toBe(true)
  })
})
