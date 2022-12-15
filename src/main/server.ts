import 'module-alias/register'
import { postgresHelpers } from '../infra/database/postgres/helpers'
import env from '@/main/config/env'

const port = env.port

postgresHelpers.connect().authenticate()
  .then(async () => {
    const { app } = await import('./config/app')

    app.listen(port, () => console.log(`Server running at http://localhost:${port}`))
  })
  .catch(console.error)
