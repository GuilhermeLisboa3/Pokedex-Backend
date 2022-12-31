import express from 'express'
import setupMiddleware from './middlewares'
import setupSwagger from './config-swagger'
import setupRoutes from './routes'

const app = express()
setupSwagger(app)
setupMiddleware(app)
setupRoutes(app)

export { app }
