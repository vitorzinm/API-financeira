import { db } from '../config/database.js'

class UsuariosRepository {
  constructor(db) {
    this.db = db
  }

  async buscarPorId(id) {
    return await this.db('usuarios').where('id', id).first()
  }

  async insertUsuarios(usuarios) {
    return await this.db('usuarios').insert(usuarios)
  }

  async listUsarios(page, limit, offset) {
    const movimentacoes = await this.db('movimentacoes')
      .select('*')
      .limit(limit)
      .offset(offset)

    return {
      page,
      limit,
      offset,
      movimentacoes,
    }
  }

  async listUsuariosById(usuarios) {
    return await this.db('usuaios').select('usuarios', usuarios)
  }
  async updateUsuarios(id, updates) {
    return await this.db('usuarios').where('id', id).update(updates)
  }
  async deleteUsuarios(id) {
    console.log('repository')
    return await this.db('usuarios').where('id', id).del()
  }
}
const usuariosRepository = new UsuariosRepository(db)
export { usuariosRepository }
