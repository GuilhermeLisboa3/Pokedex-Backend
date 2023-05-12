import { Model, Optional, Sequelize, DataTypes } from 'sequelize'

type PokemonAttributes = {
  id: string
  idPokemon: string
  userId: number
}

export interface CreatePokemonAttributes extends Optional<PokemonAttributes, 'id'> {}

export interface PokemonInstance extends Model<PokemonAttributes, CreatePokemonAttributes>, PokemonAttributes {}

export default (sequelize: Sequelize) => {
  const Pokemon = sequelize.define<PokemonInstance, PokemonAttributes>('pokemons', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    idPokemon: {
      allowNull: false,
      type: DataTypes.STRING
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  })
  return Pokemon
}
