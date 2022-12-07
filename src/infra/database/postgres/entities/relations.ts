import { postgresHelpers } from '@/infra/database/postgres/helpers'
import account from './account'

const sequelize = postgresHelpers.connect()

const Account = account(sequelize)

export {
  sequelize,
  Account
}
