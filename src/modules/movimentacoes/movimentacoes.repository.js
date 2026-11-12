const db = require("../../config/database");

class MovimentacoesRepository {
    constructor(db) {
        this.db = db;
    }

    async getAllMovimentacoes() {
        return await this.db("movimentacoes").select("*");
    }

    async cadastroMovimentacao(movimentacao) {
        return await this.db("movimentacoes").insert(movimentacao);
    }

    async getIdMovimentacoes(movimentacaoId) {
        return await this.db("movimentacoes")
            .select("*")
            .where("id", movimentacaoId)
            .first();
    }
    async deleteIdMovimentacoes(movimentacaoId) {
        return await this.db("movimentacoes").where("id", movimentacaoId).del();
    }
    async atualizarIdMovimentacoes(movimentacaoId, updates) {
        return await this.db("movimentacoes")
            .where("id", movimentacaoId)
            .update(updates);
    }
}

module.exports = new MovimentacoesRepository(db);
