import { Validation } from '@/presentation/protocols'
import { makeSignUpValidation } from '@/main/factories/controllers'
import { EmailValidatorAdapter } from '@/infra/validators'
import { RequiredFieldValidation, EmailValidation, ValidationComposite } from '@/validations/validators'

jest.mock('@/validations/validators/validation-composite')

describe('SingUpValidation Factory', () => {
  it('should call ValidationComposite with all validations ', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'name', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
