import { RequiredFieldValidation, ValidationComposite } from '@/validations/validators'
import { Validation } from '@/presentation/protocols'

export const makePokemonValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['idPokemon']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
