import dotenv from 'dotenv'
dotenv.config()

process.env.DATABASE_URL = process.env.DATABASE_URL?.replace(/_development/, '_test')
