import { Validation } from '@/presentation/protocols'
import { EmailValidator } from '@/validations/protocols/email-validator'
export class EmailValidation implements Validation {
  constructor (
    private readonly field: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate (input: any): Error {
    this.emailValidator.isValid(input[this.field])
    return null
  }
}
