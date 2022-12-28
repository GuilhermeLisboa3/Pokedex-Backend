import { sequelize, Pokemon, Account } from '@/infra/database/postgres/entities'
import { PokemonRepository } from '@/infra/database/postgres/repositories'
import { pokemonParams, accountParams } from '@/tests/mocks'

const { accountId, namePokemon } = pokemonParams
const { email, name, password } = accountParams
const makePokemon = {
  accountId,
  idPokemon: pokemonParams.idPokemon,
  namePokemon,
  photoPokemon: pokemonParams.photoPokemon,
  types: pokemonParams.types,
  urlSpecies: pokemonParams.urlSpecies
}

const makeSut = (): PokemonRepository => {
  return new PokemonRepository()
}

describe('Account Repository', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })
  afterAll(async () => {
    await sequelize.close()
  })
  describe('checkPokemon()', () => {
    it('should return true if pokemon exist', async () => {
      await Account.create({ name, email, password })
      await Pokemon.create({ ...makePokemon, userId: accountId })
      const sut = makeSut()
      const account = await sut.checkPokemon(namePokemon, accountId)
      expect(account).toBe(true)
    })

    it('should return false if pokemon not exist', async () => {
      await Account.create({ name, email, password })
      const sut = makeSut()
      const account = await sut.checkPokemon(namePokemon, accountId)
      expect(account).toBe(false)
    })
  })

  describe('add()', () => {
    it('should return true on success', async () => {
      await Account.create({ name, email, password })
      const sut = makeSut()
      const pokemon = await sut.add(makePokemon)
      expect(pokemon).toBe(true)
    })
  })
})
