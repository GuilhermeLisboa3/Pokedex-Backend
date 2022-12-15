import { makeLoginValidation } from '@/main/factories/controllers'
import { Validation } from '@/presentation/protocols'
import { EmailValidatorAdapter } from '@/infra/validators'
import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/validations/validators'

jest.mock('@/validations/validators/validation-composite')

describe('login validation', () => {
  it('should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
