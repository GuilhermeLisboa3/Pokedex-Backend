import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest } from '../helpers'
import { AddPokemon } from '@/domain/usecases'

export class AddPokemonController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addPokemon: AddPokemon
  ) {}

  async handle (request: AddPokemonController.Request): Promise<HttpResponse> {
    const error = await this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    const { accountId, idPokemon, namePokemon, photoPokemon, types, urlSpecies } = request
    await this.addPokemon.add({
      accountId,
      idPokemon,
      namePokemon,
      photoPokemon,
      types,
      urlSpecies
    })
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
    accountId: number
  }
}
