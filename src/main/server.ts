import express from 'express'
const app = express()

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
