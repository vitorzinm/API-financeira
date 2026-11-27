import { db } from '../../config/database.js'

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

  async listUsarios() {
    return await this.db('usuarios').select('*')
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
