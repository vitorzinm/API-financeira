import { usuariosService } from './usuarios.sevices.js'

class UsuariosController {
  async store(req, res) {
    const { nome, cpf, email } = req.body ?? {}

    const usuarios = await usuariosService.cadastroUsuarios({
      nome,
      cpf,
      email,
    })

    return res.status(201).json({ usuarios })
  }

  async index(req, res) {
    const usuarios = await usuariosService.listarUsuarios()

    return res.status(201).json({ usuarios })
  }

  async update(req, res) {
    console.log('Controller acessado:', req.params)
    const { id } = req.params
    const { nome, cpf, email } = req.body ?? {}

    const usuarios = await usuariosService.atualizarUsuarios(id, {
      nome,
      cpf,
      email,
    })

    return res.status(200).json({ usuarios })
  }

  async delete(req, res) {
    const { id } = req.params

    const usuarios = await usuariosService.deletarUsuarios(id)
    console.log('controller')

    return res.status(200).json({ usuarios })
  }
}
const usuariosController = new UsuariosController(usuariosService)
export { usuariosController }
