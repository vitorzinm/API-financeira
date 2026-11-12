const movimentacoesService = require("./movimentacoes.service");

class MovimentacoesController {
    async getAllMovimentacoes(req, res) {
        try {
            const movimentacoes =
                await movimentacoesService.getAllMovimentacoes();

            return res.status(200).json(movimentacoes);
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                message: error.message,
            });
        }
    }
    async cadastroMovimentacao(req, res) {
        try {
            const { descricao, valor, data, receita } = req.body ?? {};

            const movimentacao =
                await movimentacoesService.cadastroMovimentacao({
                    descricao,
                    valor,
                    data,
                    receita,
                });

            return res.status(201).json({ movimentacao });
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                message: error.message,
            });
        }
    }
    async getIdMovimentacoes(req, res) {
        try {
            const { id } = req.params;

            const movimentacaoId =
                await movimentacoesService.getIdMovimentacoes(id);
            return res.status(200).json({ movimentacaoId });
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                message: error.message,
            });
        }
    }

    async deleteIdMovimentacoes(req, res) {
        try {
            const { id } = req.params;
            const movimentacaoId =
                await movimentacoesService.deleteIdMovimentacoes(id);
            return res.status(200).json({ movimentacaoId });
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                message: error.message,
            });
        }
    }

    async atualizarIdMovimentacoes(req, res) {
        try {
            const { id } = req.params;
            const { descricao, valor, data, receita } = req.body ?? {};
            const movimentacaoId =
                await movimentacoesService.atualizarIdMovimentacoes(id, {
                    descricao,
                    valor,
                    data,
                    receita,
                });
            return res.status(200).json({ movimentacaoId });
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                message: error.message,
            });
        }
    }
}

module.exports = new MovimentacoesController();
