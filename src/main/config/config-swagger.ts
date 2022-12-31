import { serve, setup } from 'swagger-ui-express'
import { noCache } from '@/main/middlewares'
import { Express } from 'express'
import swaggerConfig from '@/main/docs'

export default (app: Express): void => {
  app.use('/api-docs', noCache, serve, setup(swaggerConfig))
}
