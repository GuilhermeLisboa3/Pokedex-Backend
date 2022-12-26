import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest } from '../helpers'

export class AddPokemonController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: AddPokemonController.Request): Promise<HttpResponse> {
    const error = await this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    return null
  }
}

export namespace AddPokemonController {
  export type Request = {
    namePokemon: string
    photoPokemon: string
    idPokemon: number
    types: string[]
    urlSpecies: string
    IdUser: number
  }
}
