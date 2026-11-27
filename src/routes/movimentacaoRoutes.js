import express from 'express'
const router = express.Router()

import { movimentacoesController as controller } from '../controllers/movimentacaoController.js'

router.post('/', controller.store) //aplicado a integração com tabela usuarios
router.get('/', controller.index)

router.get(
  '/movimentacoesDeEntrada/:usuario_id',
  controller.movimentacoesDeEntrada,
) //aplicado a integração com tabela usuarios

router.get('/movimentacoesDeSaida/:usuario_id', controller.movimentacoesDeSaida) //aplicado a integração com tabela usuarios
router.get('/extrato', controller.extrato) //aplicado a integração com tabela usuarios
router.get('/extratoPendente', controller.extratoPendente) //aplicado a integração com tabela usuarios
router.get('/:id', controller.showByMovimentacaoId)
router.get('/usuario/:usuario_id', controller.showByUserId) //aplicado a integração com tabela usuarios
router.put('/:id/:usuario_id', controller.update) //aplicado a integração com tabela usuarios
router.delete('/:id/:usuario_id', controller.destroy) //aplicado a integração com tabela usuarios

export { router as movimentacaoRoutes }
