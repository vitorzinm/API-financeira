import AppError from '../errors/AppError.js'
import { usuariosRepository } from './usuarios.repository.js'

class UsuariosService {
  validarId(id) {
    const numero = Number(id)

    if (!Number.isSafeInteger(numero) || numero <= 0) {
      throw new AppError('Informe um ID válido.', 400)
    }

    return numero
  }

  validarDados(dados) {
    if (
      !dados ||
      typeof dados !== 'object' ||
      Array.isArray(dados) ||
      Object.keys(dados).length === 0
    ) {
      throw new AppError('É necessário fornecer dados válidos.', 400)
    }

    if (Object.hasOwn(dados, 'id')) {
      throw new AppError('Não envie o ID no corpo da requisição.', 400)
    }
  }

  async cadastroUsuarios(usuarios) {
    this.validarDados(usuarios)

    return await usuariosRepository.insertUsuarios(usuarios)
  }

  async listarUsuarios() {
    return await usuariosRepository.listUsarios()
  }

  async atualizarUsuarios(id, updates) {
    const usuarioId = this.validarId(id)
    this.validarDados(updates)

    const usuario = await usuariosRepository.buscarPorId(usuarioId)

    if (!usuario) {
      throw new AppError('Usuário não encontrado.', 404)
    }

    return await usuariosRepository.updateUsuarios(usuarioId, updates)
  }

  async deletarUsuarios(id) {
    const usuarioId = this.validarId(id)

    const quantidadeExcluida =
      await usuariosRepository.deleteUsuarios(usuarioId)

    if (quantidadeExcluida === 0) {
      throw new AppError('Usuário não encontrado.', 404)
    }

    return quantidadeExcluida
  }
}

const usuariosService = new UsuariosService()
export { usuariosService }
