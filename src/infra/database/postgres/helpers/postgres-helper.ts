import { Sequelize, Options } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

export const postgresHelpers = {
  client: null as Sequelize,

  connect (): Sequelize {
    const dbUrl = process.env.DATABASE_URL
    if (dbUrl === undefined) throw new Error('DATABASE_URL environment variable is not defined')
    const defaultOptions: Options = {
      define: { underscored: true },
      logging: process.env.NODE_ENV !== 'test' ? console.log : false
    }
    this.client = new Sequelize(dbUrl, defaultOptions)
    return this.client
  },

  disconnect (): void {
    this.client.close()
  }
}
