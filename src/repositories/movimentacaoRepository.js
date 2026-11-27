import { db } from '../config/database.js'

class MovimentacoesRepository {
  constructor(db) {
    this.db = db
  }

  async insertMovimentacao(movimentacao) {
    return await this.db('movimentacoes').insert(movimentacao)
  }

  async findMovimentacaoById(movimentacaoId) {
    return await this.db('movimentacoes')
      .select('*')
      .where('id', movimentacaoId)
      .first()
  }

  // async listMovimentacaoes() {
  //   return await this.db('movimentacoes').select('*')
  // }
  async listMovimentacaoesOfUser(movimentacoes) {
    return await this.db('movimentacoes')
      .select('*')
      .where('usuario_id', movimentacoes)
  }

  async listMovimentacoesDeEntrada(movimentacoes) {
    return await this.db('movimentacoes')
      .where('usuario_id', movimentacoes)
      .where('receita', true)
      .select('*')
  }

  async listMovimentacoesDeSaida(movimentacoes) {
    return await this.db('movimentacoes')
      .where('usuario_id', movimentacoes)
      .where('receita', false)
      .select('*')
  }

  async listExtrato(usuario_id, dataInicio, dataFim) {
    return await this.db('movimentacoes')
      .where('usuario_id', usuario_id)
      .whereBetween('data', [dataInicio, dataFim])
  }

  async listExtratoPendente(usuario_id, dataInicio, dataFim) {
    return this.db('movimentacoes')
      .where('efetivado', false)
      .andWhere('usuario_id', usuario_id)
      .whereBetween('data', [dataInicio, dataFim])
      .select('receita', 'valor')
  }

  async updateMovimentacaoById(movimentacaoId, usuario_id, updates) {
    return await this.db('movimentacoes')
      .where('id', movimentacaoId)
      .where('usuario_id', usuario_id)
      .update(updates)
  }

  async deleteMovimentacaoById(movimentacaoId, usuario_id) {
    return await this.db('movimentacoes')
      .where('id', movimentacaoId)
      .where('usuario_id', usuario_id)
      .del()
  }
}

const movimentacoesRepository = new MovimentacoesRepository(db)
export { movimentacoesRepository }
