
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('pokemons', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      id_pokemon: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      name_pokemon: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      photo_pokemon: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      types: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      url_species: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      account_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users')
  }
}
