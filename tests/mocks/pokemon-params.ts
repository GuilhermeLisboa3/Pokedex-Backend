import { faker } from '@faker-js/faker'

export const pokemonParams = {
  id: faker.datatype.uuid(),
  idPokemon: faker.datatype.uuid(),
  namePokemon: faker.name.fullName(),
  types: [faker.database.type()],
  photoPokemon: faker.internet.url(),
  urlSpecies: faker.internet.url(),
  accountId: 1
}
