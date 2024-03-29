import { sequelize, Pokemon, Account } from '@/infra/database/postgres/entities'
import { PokemonRepository } from '@/infra/database/postgres/repositories'
import { pokemonParams, accountParams } from '@/tests/mocks'

const { accountId, idPokemon } = pokemonParams
const { email, name, password } = accountParams
const makePokemon = { idPokemon }

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

  describe('add()', () => {
    it('should return true on success', async () => {
      await Account.create({ name, email, password })
      const sut = makeSut()
      const pokemon = await sut.add({ ...makePokemon, accountId })
      expect(pokemon).toBe(true)
    })
  })

  describe('list()', () => {
    it('should return list pokemons on success', async () => {
      await Account.create({ name, email, password })
      await Pokemon.create({ ...makePokemon, userId: accountId })
      const sut = makeSut()
      const pokemon = await sut.list(accountId)
      expect(pokemon[0].id).toBeTruthy()
      expect(pokemon[0].idPokemon).toBe(idPokemon)
    })
  })

  describe('checkById()', () => {
    it('should return true if pokemon exist', async () => {
      await Account.create({ name, email, password })
      await Pokemon.create({ ...makePokemon, userId: accountId })
      const sut = makeSut()
      const account = await sut.checkById(idPokemon, accountId)
      expect(account).toBe(true)
    })

    it('should return false if pokemon not exist', async () => {
      await Account.create({ name, email, password })
      const sut = makeSut()
      const account = await sut.checkById(idPokemon, accountId)
      expect(account).toBe(false)
    })
  })

  describe('deleteById()', () => {
    it('should delete pokemon on success', async () => {
      const sut = makeSut()
      await Account.create({ name, email, password })
      await Pokemon.create({ ...makePokemon, userId: accountId })
      await sut.deleteById(idPokemon, accountId)
      expect(await Pokemon.findOne({ where: { idPokemon, userId: accountId } })).toBeNull()
    })
  })
})
