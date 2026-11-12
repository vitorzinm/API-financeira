const movimentacoesRepository = require("./movimentacoes.repository");

class MovimentacoesService {
    async getAllMovimentacoes() {
        return await movimentacoesRepository.getAllMovimentacoes();
    }

    async cadastroMovimentacao(movimentacao) {
        if (!movimentacao || Object.keys(movimentacao).length === 0) {
            throw Object.assign(
                new Error(
                    "Para o cadastro, é necessário fornecer dados válidos.",
                ),
                { statusCode: 400 },
            );
        }
        return await movimentacoesRepository.cadastroMovimentacao(movimentacao);
    }

    async getIdMovimentacoes(movimentacaoId) {
        return await movimentacoesRepository.getIdMovimentacoes(movimentacaoId);
    }

    async deleteIdMovimentacoes(movimentacaoId) {
        if (!movimentacaoId) {
            throw Object.assign(new Error("Movimentação não encontrada."), {
                statusCode: 404,
            });
        } else if (movimentacaoId == null || movimentacaoId == undefined) {
            throw Object.assign(
                new Error(
                    "Para o deletar, é necessário fornecer um ID válido.",
                ),
                { statusCode: 400 },
            );
        }
        return await movimentacoesRepository.deleteIdMovimentacoes(
            movimentacaoId,
        );
    }

    async atualizarIdMovimentacoes(movimentacaoId, updates) {
        if (!movimentacaoId) {
            throw Object.assign(new Error("Movimentação não encontrada."), {
                statusCode: 404,
            });
        } else if (movimentacaoId == null || movimentacaoId == undefined) {
            throw Object.assign(new Error("Movimentação não encontrada."), {
                statusCode: 404,
            });
        }
        if (!updates || Object.keys(updates).length === 0) {
            throw Object.assign(
                new Error(
                    "Para a atualização, é necessário fornecer dados válidos.",
                ),
                { statusCode: 400 },
            );
        }
        return await movimentacoesRepository.atualizarIdMovimentacoes(
            movimentacaoId,
            updates,
        );
    }
}

module.exports = new MovimentacoesService();
