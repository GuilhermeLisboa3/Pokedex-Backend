import { makePokemonValidation } from '@/main/factories/controllers'
import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/validations/validators'

jest.mock('@/validations/validators/validation-composite')

describe('login validation', () => {
  it('should call ValidationComposite with all validations', () => {
    makePokemonValidation()
    const validations: Validation[] = []
    for (const field of ['namePokemon', 'photoPokemon', 'idPokemon', 'types', 'urlSpecies']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
