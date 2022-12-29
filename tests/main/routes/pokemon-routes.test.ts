import request from 'supertest'
import { sequelize, Account } from '@/infra/database/postgres/entities'
import { app } from '@/main/config/app'
import { pokemonParams } from '@/tests/mocks'
import { sign } from 'jsonwebtoken'
import env from '@/main/config/env'

const { accountId, idPokemon, namePokemon, photoPokemon, types, urlSpecies } = pokemonParams

const makeAccessToken = async (): Promise<string> => {
  await Account.create({
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'any_password'
  })
  const { id } = await Account.findOne({ where: { email: 'any_email@email.com' } })
  const accessToken = sign({ id }, env.jwtSecret)
  return accessToken
}

describe('SignUp Routes', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })
  afterAll(async () => {
    await sequelize.close()
  })
  describe('/pokemon', () => {
    it('should return 403 if accessToken is not supplied', async () => {
      await request(app)
        .post('/pokemon')
        .send({
          accountId,
          idPokemon,
          namePokemon,
          photoPokemon,
          types,
          urlSpecies
        })
        .expect(403)
    })

    it('should return 200 on success', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .post('/pokemon')
        .set({ authorization: `Bearer ${accessToken}` })
        .send({
          idPokemon,
          namePokemon,
          photoPokemon,
          types,
          urlSpecies
        })
        .expect(200)
    })
  })

  describe('/pokemons', () => {
    it('should return 403 if accessToken is not supplied', async () => {
      await request(app)
        .get('/pokemons')
        .expect(403)
    })

    it('should return 200 on success', async () => {
      const accessToken = await makeAccessToken()
      const { body } = await request(app)
        .get('/pokemons')
        .set({ authorization: `Bearer ${accessToken}` })
        .expect(200)
      expect(body).toEqual([])
    })
  })
})
