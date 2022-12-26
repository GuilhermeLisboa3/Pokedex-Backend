import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, serverError } from '../helpers'
import { AddPokemon } from '@/domain/usecases'
import { PokemonInUseError } from '@/presentation/errors'

export class AddPokemonController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addPokemon: AddPokemon
  ) {}

  async handle (request: AddPokemonController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { accountId, idPokemon, namePokemon, photoPokemon, types, urlSpecies } = request
      const isValid = await this.addPokemon.add({
        accountId,
        idPokemon,
        namePokemon,
        photoPokemon,
        types,
        urlSpecies
      })
      if (!isValid) {
        return forbidden(new PokemonInUseError())
      }
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddPokemonController {
  export type Request = {
    namePokemon: string
    photoPokemon: string
    idPokemon: number
    types: string[]
    urlSpecies: string
    accountId: number
  }
}
