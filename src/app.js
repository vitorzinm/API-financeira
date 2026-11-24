import express from 'express'
import { configDotenv } from 'dotenv'
import { router } from './modules/movimentacoes/movimentacoes.routes.js'
import { errorMiddleware } from './modules/errors/errorMiddleware.js'

configDotenv()

const app = express()
const PORT = process.env.APP_PORT

app.use(express.json())

app.use('/', router)
app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`)
})
