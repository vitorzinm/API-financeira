import express from 'express'
const router = express.Router()

import { usuarioRoutes } from './usuarioRoutes.js'
import { movimentacaoRoutes } from './movimentacaoRoutes.js'

router.use('/usuarios', usuarioRoutes)
router.use('/movimentacoes', movimentacaoRoutes)

export { router }
