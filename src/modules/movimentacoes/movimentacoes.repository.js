import { db } from '../../config/database.js'

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

  async listMovimentacaoes() {
    return await this.db('movimentacoes').select('*')
  }

  async listMovimentacoesDeEntrada() {
    return await this.db('movimentacoes').where('receita', true).select('*')
  }

  async listMovimentacoesDeSaida() {
    return await this.db('movimentacoes').where('receita', false).select('*')
  }

  async listExtrato(dataInicio, dataFim) {
    return await this.db('movimentacoes')
      .select('*')
      .whereBetween('data', [dataInicio, dataFim])
  }

  async listExtratoPendente() {
    return this.db('movimentacoes')
      .where('efetivado', false)
      .whereBetween('data', [dataInicio, dataFim])
      .select('receita', 'valor')
  }

  async updateMovimentacaoById(movimentacaoId, updates) {
    return await this.db('movimentacoes')
      .where('id', movimentacaoId)
      .update(updates)
  }

  async deleteMovimentacaoById(movimentacaoId) {
    return await this.db('movimentacoes').where('id', movimentacaoId).del()
  }
}

const movimentacoesRepository = new MovimentacoesRepository(db)
export { movimentacoesRepository }
