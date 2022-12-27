import request from 'supertest'
import { sequelize } from '@/infra/database/postgres/entities'
import { app } from '@/main/config/app'
import { pokemonParams } from '@/tests/mocks'

const { accountId, idPokemon, namePokemon, photoPokemon, types, urlSpecies } = pokemonParams

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
  })
})
