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
            const { descricao, valor, data, receita, efetivado } =
                req.body ?? {};

            const movimentacao =
                await movimentacoesService.cadastroMovimentacao({
                    descricao,
                    valor,
                    data,
                    receita,
                    efetivado,
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
            const { descricao, valor, data, receita, efetivado } =
                req.body ?? {};
            const movimentacaoId =
                await movimentacoesService.atualizarIdMovimentacoes(id, {
                    descricao,
                    valor,
                    data,
                    receita,
                    efetivado,
                });
            return res.status(200).json({ movimentacaoId });
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                message: error.message,
            });
        }
    }
    async movimentacoesDeEntrada(req, res) {
        try {
            const movimentacoesDeEntrada =
                await movimentacoesService.movimentacoesDeEntrada();
            return res.status(200).json({ movimentacoesDeEntrada });
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                message: error.message,
            });
        }
    }
    async movimentacoesDeSaida(req, res) {
        try {
            const movimentacoesDeSaida =
                await movimentacoesService.movimentacoesDeSaida();
            return res.status(200).json({ movimentacoesDeSaida });
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                message: error.message,
            });
        }
    }
    async extrato(req, res) {
        try {
            const { data } = req.params;
            const extrato = await movimentacoesService.extrato(data);
            return res.status(200).json({ extrato });
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                message: error.message,
            });
        }
    }

    async extratoPendente(req, res) {
        try {
            const extratoPendente =
                await movimentacoesService.extratoPendente();
            return res.status(200).json({ extratoPendente });
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                message: error.message,
            });
        }
    }
}
module.exports = new MovimentacoesController();
