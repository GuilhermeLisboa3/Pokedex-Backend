import { Model, Optional, Sequelize, DataTypes } from 'sequelize'

type AccountAttributes = {
  id: string
  name: string
  email: string
  password: string
}

export interface CreateAccountAttributes extends Optional<AccountAttributes, 'id'> {}

export interface AccountInstance extends Model<AccountAttributes, CreateAccountAttributes>, AccountAttributes {}

export default (sequelize: Sequelize) => {
  const Account = sequelize.define<AccountInstance, AccountAttributes>('users', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    }
  })
  return Account
}
