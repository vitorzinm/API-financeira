const movimentacoesRepository = require("./movimentacoes.repository");

class MovimentacoesService {
    async getAllMovimentacoes() {
        return await movimentacoesRepository.getAllMovimentacoes();
    }

    async cadastroMovimentacao(movimentacao) {
        return await movimentacoesRepository.cadastroMovimentacao(movimentacao);
    }
    async getIdMovimentacoes(movimentacaoId) {
        return await movimentacoesRepository.getIdMovimentacoes(movimentacaoId);
    }
    async deleteIdMovimentacoes(movimentacaoId) {
        return await movimentacoesRepository.deleteIdMovimentacoes(
            movimentacaoId,
        );

        if (!movimentacaoId) {
            throw new Error("Movimentação não encontrada.");
        } else if (movimentacaoId === 0) {
            throw new Error("É necessário informar o ID da movimentação.");
        }
    }
    async updateIdMovimentacoes(movimentacaoId, updates) {
        return await movimentacoesRepository.updateIdMovimentacoes(
            movimentacaoId,
            updates,
        );
    }
}

module.exports = new MovimentacoesService();
