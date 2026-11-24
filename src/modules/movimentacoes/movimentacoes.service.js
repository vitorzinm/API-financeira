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

    async movimentacoesDeEntrada() {
        return await movimentacoesRepository.movimentacoesDeEntrada();
    }
    async movimentacoesDeSaida() {
        return await movimentacoesRepository.movimentacoesDeSaida();
    }
    async extrato(dataInicio, dataFim) {
        if (dataFim == null || dataFim == 0 || dataFim == undefined) {
            dataFim = dataInicio;
        }

        function dataValida(valor) {
            if (
                typeof valor !== "string" ||
                !/^\d{4}-\d{2}-\d{2}$/.test(valor)
            ) {
                return false;
            }

            const data = new Date(`${valor}T00:00:00.000Z`);
            return (
                !Number.isNaN(data.getTime()) &&
                data.toISOString().slice(0, 10) === valor
            );
        }

        if (!dataValida(dataInicio) || !dataValida(dataFim)) {
            throw Object.assign(
                new Error("Informe datas válidas no formato AAAA-MM-DD."),
                { statusCode: 400 },
            );
        }

        if (dataInicio > dataFim) {
            [dataInicio, dataFim] = [dataFim, dataInicio];
        }

        const extrato = await movimentacoesRepository.extrato(
            dataInicio,
            dataFim,
        );

        let entradaEmCentavos = 0;
        let saidaEmCentavos = 0;

        for (const movimentacao of extrato) {
            const centavos = Math.round(Number(movimentacao.valor) * 100);

            if (Number(movimentacao.receita) === 1) {
                entradaEmCentavos += centavos;
            } else {
                saidaEmCentavos += centavos;
            }
        }
        return {
            totalDeEntrada: entradaEmCentavos / 100,
            totalDeSaida: saidaEmCentavos / 100,
            lucro: (entradaEmCentavos - saidaEmCentavos) / 100,
        };
    }

    async extratoPendente() {
          if (dataFim == null || dataFim == 0 || dataFim == undefined) {
            dataFim = dataInicio;
        }

        function dataValida(valor) {
            if (
                typeof valor !== "string" ||
                !/^\d{4}-\d{2}-\d{2}$/.test(valor)
            ) {
                return false;
            }

            const data = new Date(`${valor}T00:00:00.000Z`);
            return (
                !Number.isNaN(data.getTime()) &&
                data.toISOString().slice(0, 10) === valor
            );
        }

        if (!dataValida(dataInicio) || !dataValida(dataFim)) {
            throw Object.assign(
                new Error("Informe datas válidas no formato AAAA-MM-DD."),
                { statusCode: 400 },
            );
        }

        if (dataInicio > dataFim) {
            [dataInicio, dataFim] = [dataFim, dataInicio];
        }

        const pendentes = await movimentacoesRepository.extratoPendente(
            dataInicio,
            dataFim,
        );
        let entradaEmCentavos = 0;
        let saidaEmCentavos = 0;

        for (const movimentacao of pendentes) {
            const centavos = Math.round(Number(movimentacao.valor) * 100);

            if (Number(movimentacao.receita) === 1) {
                entradaEmCentavos += centavos;
            } else {
                saidaEmCentavos += centavos;
            }
        }

        let mensagem = "Saldo zerado";

        const saldoEmCentavos = entradaEmCentavos - saidaEmCentavos;

        if (saldoEmCentavos > 0) {
            mensagem = "Saldo positivo";
        } else if (saldoEmCentavos < 0) {
            mensagem = "Saldo negativo";
        } else {
            mensagem = "Saldo zerado";
        }
        return {
            totalDeEntrada: entradaEmCentavos / 100,
            totalDeSaida: saidaEmCentavos / 100,
            resumoDeExtratoPendente:
                (entradaEmCentavos - saidaEmCentavos) / 100,

            mensagem: mensagem,
        };
    }
}
module.exports = new MovimentacoesService();
