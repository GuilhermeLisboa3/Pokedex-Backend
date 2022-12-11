import 'module-alias/register'
import { postgresHelpers } from '../infra/database/postgres/helpers'

const port = process.env.PORT || 3001

postgresHelpers.connect().authenticate()
  .then(async () => {
    const { app } = await import('./config/app')

    app.listen(port, () => console.log(`Server running at http://localhost:${port}`))
  })
  .catch(console.error)
