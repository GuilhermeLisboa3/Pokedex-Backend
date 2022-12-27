import { postgresHelpers } from '../helpers'
import account from './account'
import pokemon from './pokemon'

const sequelize = postgresHelpers.connect()

const Account = account(sequelize)
const Pokemon = pokemon(sequelize)

Account.hasMany(Pokemon)
Pokemon.belongsTo(Account)

export {
  sequelize,
  Account,
  Pokemon
}
