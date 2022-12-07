import { Sequelize, Options } from 'sequelize'
export const postgresHelpers = {
  client: null as Sequelize,

  connect (): Sequelize {
    const dbUrl = process.env.DATABASE_URL
    if (dbUrl === undefined) throw new Error('DATABASE_URL environment variable is not defined')
    const defaultOptions: Options = {
      define: { underscored: true }
    }
    this.client = new Sequelize(dbUrl, defaultOptions)
    return this.client
  },

  disconnect (): void {
    this.client.close()
  }
}
