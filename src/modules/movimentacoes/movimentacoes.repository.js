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

    async movimentacoesDeEntrada() {
        return await this.db("movimentacoes")
            .where("receira", true)
            .select("*");
    }
    async movimentacoesDeSaida() {
        return await this.db("movimentacoes")
            .where("receira", false)
            .select("*");
    }

    async extrato(dataInicio, dataFim) {
        return await this.db("movimentacoes")
            .select("*")
            .whereBetween("data", [dataInicio, dataFim]);
    }

    async extratoPendente() {
        return this.db("movimentacoes")
            .where("efetivado", false)
            .select("receita", "valor");
    }
}

module.exports = new MovimentacoesRepository(db);
