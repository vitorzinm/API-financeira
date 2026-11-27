import express from 'express'
import { configDotenv } from 'dotenv'
import { router as movimentacoesRouter } from './modules/movimentacoes/movimentacoes.routes.js'
import { router as usuariosRouter } from './modules/usuarios/usuarios.routes.js'
import { errorMiddleware } from './modules/errors/errorMiddleware.js'

configDotenv()

const app = express()
const PORT = process.env.APP_PORT || 4000

app.use(express.json())

app.use('/usuarios', usuariosRouter)
app.use('/movimentacoes', movimentacoesRouter)

app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`)
})
