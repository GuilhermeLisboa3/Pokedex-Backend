import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, ok, serverError } from '../../helpers'
import { AddPokemon } from '@/domain/usecases'
import { PokemonInUseError } from '@/presentation/errors'

export class AddPokemonController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addPokemon: AddPokemon
  ) {}

  async handle (request: AddPokemonController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { accountId, idPokemon } = request
      const isValid = await this.addPokemon.add({
        idPokemon
      }, accountId)

      if (!isValid) {
        return forbidden(new PokemonInUseError())
      }
      return ok(isValid)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddPokemonController {
  export type Request = {
    idPokemon: string
    accountId: number
  }
}
