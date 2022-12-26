import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class AddPokemonController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: any): Promise<HttpResponse> {
    await this.validation.validate(request)
    return null
  }
}
