import express from 'express'
import { usuariosController as controller } from './usuarios.controller.js'

const router = express.Router()

router.post('/', controller.store)
router.get('/', controller.index)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

export { router }
