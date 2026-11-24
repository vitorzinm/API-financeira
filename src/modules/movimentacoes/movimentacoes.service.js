import { movimentacoesRepository } from './movimentacoes.repository.js'

class MovimentacoesService {
  async cadastroMovimentacao(movimentacao) {
    if (!movimentacao || Object.keys(movimentacao).length === 0) {
      throw Object.assign(
        new Error('Para o cadastro, é necessário fornecer dados válidos.'),
        { statusCode: 400 },
      )
    }
    return await movimentacoesRepository.insertMovimentacao(movimentacao)
  }

  async getMovimentacaoById(movimentacaoId) {
    return await movimentacoesRepository.findMovimentacaoById(movimentacaoId)
  }

  async getAllMovimentacoes() {
    return await movimentacoesRepository.listMovimentacaoes()
  }

  async movimentacoesDeEntrada() {
    return await movimentacoesRepository.listMovimentacoesDeEntrada()
  }

  async movimentacoesDeSaida() {
    return await movimentacoesRepository.listMovimentacoesDeSaida()
  }

  async getExtrato(dataInicio, dataFim) {
    if (dataFim == null || dataFim == 0 || dataFim == undefined) {
      dataFim = dataInicio
    }

    function dataValida(valor) {
      if (typeof valor !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(valor)) {
        return false
      }

      const data = new Date(`${valor}T00:00:00.000Z`)
      return (
        !Number.isNaN(data.getTime()) &&
        data.toISOString().slice(0, 10) === valor
      )
    }

    if (!dataValida(dataInicio) || !dataValida(dataFim)) {
      throw Object.assign(
        new Error('Informe datas válidas no formato AAAA-MM-DD.'),
        { statusCode: 400 },
      )
    }

    if (dataInicio > dataFim) {
      ;[dataInicio, dataFim] = [dataFim, dataInicio]
    }

    const extrato = await movimentacoesRepository.listExtrato(
      dataInicio,
      dataFim,
    )

    let entradaEmCentavos = 0
    let saidaEmCentavos = 0

    for (const movimentacao of extrato) {
      const centavos = Math.round(Number(movimentacao.valor) * 100)

      if (Number(movimentacao.receita) === 1) {
        entradaEmCentavos += centavos
      } else {
        saidaEmCentavos += centavos
      }
    }
    return {
      totalDeEntrada: entradaEmCentavos / 100,
      totalDeSaida: saidaEmCentavos / 100,
      lucro: (entradaEmCentavos - saidaEmCentavos) / 100,
    }
  }

  async extratoPendente() {
    if (dataFim == null || dataFim == 0 || dataFim == undefined) {
      dataFim = dataInicio
    }

    function dataValida(valor) {
      if (typeof valor !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(valor)) {
        return false
      }

      const data = new Date(`${valor}T00:00:00.000Z`)
      return (
        !Number.isNaN(data.getTime()) &&
        data.toISOString().slice(0, 10) === valor
      )
    }

    if (!dataValida(dataInicio) || !dataValida(dataFim)) {
      throw Object.assign(
        new Error('Informe datas válidas no formato AAAA-MM-DD.'),
        { statusCode: 400 },
      )
    }

    if (dataInicio > dataFim) {
      ;[dataInicio, dataFim] = [dataFim, dataInicio]
    }

    const pendentes = await movimentacoesRepository.listExtratoPendente(
      dataInicio,
      dataFim,
    )

    let entradaEmCentavos = 0
    let saidaEmCentavos = 0

    for (const movimentacao of pendentes) {
      const centavos = Math.round(Number(movimentacao.valor) * 100)

      if (Number(movimentacao.receita) === 1) entradaEmCentavos += centavos
      else saidaEmCentavos += centavos
    }

    let mensagem = 'Saldo zerado'

    const saldoEmCentavos = entradaEmCentavos - saidaEmCentavos

    if (saldoEmCentavos > 0) mensagem = 'Saldo positivo'
    else if (saldoEmCentavos < 0) mensagem = 'Saldo negativo'
    else mensagem = 'Saldo zerado'

    return {
      totalDeEntrada: entradaEmCentavos / 100,
      totalDeSaida: saidaEmCentavos / 100,
      resumoDeExtratoPendente: (entradaEmCentavos - saidaEmCentavos) / 100,

      mensagem: mensagem,
    }
  }

  async atualizarMovimentacao(movimentacaoId, updates) {
    if (!movimentacaoId) {
      throw Object.assign(new Error('Movimentação não encontrada.'), {
        statusCode: 404,
      })
    } else if (movimentacaoId == null || movimentacaoId == undefined) {
      throw Object.assign(new Error('Movimentação não encontrada.'), {
        statusCode: 404,
      })
    }
    if (!updates || Object.keys(updates).length === 0) {
      throw Object.assign(
        new Error('Para a atualização, é necessário fornecer dados válidos.'),
        { statusCode: 400 },
      )
    }
    return await movimentacoesRepository.updateMovimentacaoById(
      movimentacaoId,
      updates,
    )
  }

  async deletarMovimentacao(movimentacaoId) {
    if (!movimentacaoId) {
      throw Object.assign(new Error('Movimentação não encontrada.'), {
        statusCode: 404,
      })
    } else if (movimentacaoId == null || movimentacaoId == undefined) {
      throw Object.assign(
        new Error('Para o deletar, é necessário fornecer um ID válido.'),
        { statusCode: 400 },
      )
    }
    return await movimentacoesRepository.deleteMovimentacaoById(movimentacaoId)
  }
}

const movimentacoesService = new MovimentacoesService()
export { movimentacoesService }
