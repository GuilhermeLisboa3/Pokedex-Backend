import { faker } from '@faker-js/faker'

export const accountParams = {
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  token: faker.datatype.uuid()
}
