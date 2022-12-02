import { EmailValidator } from '@/validations/protocols'
export class EmailValidationSpy implements EmailValidator {
  email: string
  isEmailValid = true
  isValid (email: string): boolean {
    this.email = email
    return this.isEmailValid
  }
}
