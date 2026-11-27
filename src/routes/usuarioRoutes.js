import express from 'express'
import { usuariosController as controller } from '../controllers/usuarioController.js'

const router = express.Router()

router.post('/', controller.store)
router.get('/', controller.index)
router.get('/:id', controller.show)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

export { router as usuarioRoutes }
