import { Model, Optional, Sequelize, DataTypes } from 'sequelize'

type PokemonAttributes = {
  id: string
  namePokemon: string
  photoPokemon: string
  idPokemon: string
  types: string[]
  urlSpecies: string
  accountId: number
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
    namePokemon: {
      allowNull: false,
      type: DataTypes.STRING
    },
    photoPokemon: {
      allowNull: false,
      type: DataTypes.STRING
    },
    idPokemon: {
      allowNull: false,
      type: DataTypes.STRING
    },
    types: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    urlSpecies: {
      allowNull: false,
      type: DataTypes.STRING
    },
    accountId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  })
  return Pokemon
}
