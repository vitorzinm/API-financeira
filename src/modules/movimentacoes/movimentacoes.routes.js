import express from 'express'
const router = express.Router()

import { movimentacoesController as controller } from './movimentacoes.controller.js'

router.post('/', controller.store)
router.get('/', controller.index)
router.get('/movimentacoesDeEntrada', controller.movimentacoesDeEntrada)
router.get('/movimentacoesDeSaida', controller.movimentacoesDeSaida)
router.get('/extrato', controller.extrato)
router.get('/extratoPendente', controller.extratoPendente)
router.get('/:id', controller.show)
router.put('/:id', controller.update)
router.delete('/:id', controller.destroy)

export { router }
