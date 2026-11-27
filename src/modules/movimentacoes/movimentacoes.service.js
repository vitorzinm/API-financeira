import AppError from '../errors/AppError.js'
import { movimentacoesRepository } from './movimentacoes.repository.js'

class MovimentacoesService {
  validarId(id, campo = 'ID') {
    if (
      !['string', 'number'].includes(typeof id) ||
      !/^\d+$/.test(String(id)) ||
      !Number.isSafeInteger(Number(id)) ||
      Number(id) <= 0
    ) {
      throw new AppError(`Informe um ${campo} válido.`, 400)
    }

    return Number(id)
  }

  dataValida(valor) {
    if (
      typeof valor !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}$/.test(valor) ||
      valor < '1000-01-01'
    ) {
      return false
    }

    const data = new Date(`${valor}T00:00:00.000Z`)

    return (
      !Number.isNaN(data.getTime()) && data.toISOString().slice(0, 10) === valor
    )
  }

  validarPeriodo(dataInicio, dataFim) {
    // Somente a ausência de dataFim usa dataInicio.
    dataFim = dataFim ?? dataInicio

    if (!this.dataValida(dataInicio) || !this.dataValida(dataFim)) {
      throw new AppError('Informe datas válidas no formato AAAA-MM-DD.', 400)
    }

    if (dataInicio > dataFim) {
      return { dataInicio: dataFim, dataFim: dataInicio }
    }

    return { dataInicio, dataFim }
  }

  validarDados(dados, cadastro = false) {
    if (
      !dados ||
      typeof dados !== 'object' ||
      Array.isArray(dados) ||
      Object.keys(dados).length === 0
    ) {
      throw new AppError('É necessário fornecer dados válidos.', 400)
    }

    const camposPermitidos = [
      'descricao',
      'valor',
      'data',
      'receita',
      'efetivado',
    ]

    // O proprietário não pode ser alterado pelo body do PUT.
    if (cadastro) camposPermitidos.push('usuario_id')

    for (const campo of Object.keys(dados)) {
      if (!camposPermitidos.includes(campo)) {
        throw new AppError(`Campo não permitido: ${campo}.`, 400)
      }
    }

    if (cadastro) {
      for (const campo of camposPermitidos) {
        if (!Object.hasOwn(dados, campo)) {
          throw new AppError(`O campo ${campo} é obrigatório.`, 400)
        }
      }
    }

    const validado = { ...dados }

    if (Object.hasOwn(dados, 'descricao')) {
      if (
        typeof dados.descricao !== 'string' ||
        !dados.descricao.trim() ||
        dados.descricao.trim().length > 255
      ) {
        throw new AppError(
          'A descrição deve conter entre 1 e 255 caracteres.',
          400,
        )
      }

      validado.descricao = dados.descricao.trim()
    }

    if (Object.hasOwn(dados, 'valor')) {
      const valor = String(dados.valor)

      // Compatível com DECIMAL(12,2): até 10 dígitos inteiros.
      if (
        !['number', 'string'].includes(typeof dados.valor) ||
        !/^\d{1,10}(\.\d{1,2})?$/.test(valor) ||
        Number(valor) <= 0
      ) {
        throw new AppError(
          'O valor deve ser positivo, com até duas casas decimais e ponto como separador.',
          400,
        )
      }

      validado.valor = Number(valor)
    }

    if (Object.hasOwn(dados, 'data') && !this.dataValida(dados.data)) {
      throw new AppError('Informe uma data válida no formato AAAA-MM-DD.', 400)
    }

    for (const campo of ['receita', 'efetivado']) {
      if (Object.hasOwn(dados, campo) && typeof dados[campo] !== 'boolean') {
        throw new AppError(`O campo ${campo} deve ser true ou false.`, 400)
      }
    }

    if (cadastro) {
      validado.usuario_id = this.validarId(dados.usuario_id, 'usuario_id')
    }

    return validado
  }

  calcularTotais(movimentacoes) {
    let entradaEmCentavos = 0
    let saidaEmCentavos = 0

    for (const movimentacao of movimentacoes) {
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
      saldo: (entradaEmCentavos - saidaEmCentavos) / 100,
    }
  }

  async cadastroMovimentacao(movimentacao) {
    const dados = this.validarDados(movimentacao, true)

    return await movimentacoesRepository.insertMovimentacao(dados)
  }

  async getMovimentacaoById(movimentacaoId) {
    const id = this.validarId(movimentacaoId, 'ID da movimentação')
    const movimentacao = await movimentacoesRepository.findMovimentacaoById(id)

    if (!movimentacao) {
      throw new AppError('Movimentação não encontrada.', 404)
    }

    return movimentacao
  }

  async getUser(usuario_id) {
    const id = this.validarId(usuario_id, 'usuario_id')

    return await movimentacoesRepository.listMovimentacaoesOfUser(id)
  }

  async movimentacoesDeEntrada(usuario_id) {
    const id = this.validarId(usuario_id, 'usuario_id')

    return await movimentacoesRepository.listMovimentacoesDeEntrada(id)
  }

  async movimentacoesDeSaida(usuario_id) {
    const id = this.validarId(usuario_id, 'usuario_id')

    return await movimentacoesRepository.listMovimentacoesDeSaida(id)
  }

  async getExtrato(usuario_id, dataInicio, dataFim) {
    const id = this.validarId(usuario_id, 'usuario_id')
    const periodo = this.validarPeriodo(dataInicio, dataFim)

    const extrato = await movimentacoesRepository.listExtrato(
      id,
      periodo.dataInicio,
      periodo.dataFim,
    )

    const totais = this.calcularTotais(extrato)

    return {
      totalDeEntrada: totais.totalDeEntrada,
      totalDeSaida: totais.totalDeSaida,
      lucro: totais.saldo,
    }
  }

  async getExtratoPendente(usuario_id, dataInicio, dataFim) {
    const id = this.validarId(usuario_id, 'usuario_id')
    const periodo = this.validarPeriodo(dataInicio, dataFim)

    const pendentes = await movimentacoesRepository.listExtratoPendente(
      id,
      periodo.dataInicio,
      periodo.dataFim,
    )

    const totais = this.calcularTotais(pendentes)

    let mensagem = 'Saldo zerado'

    if (totais.saldo > 0) mensagem = 'Saldo positivo'
    else if (totais.saldo < 0) mensagem = 'Saldo negativo'

    return {
      totalDeEntrada: totais.totalDeEntrada,
      totalDeSaida: totais.totalDeSaida,
      resumoDeExtratoPendente: totais.saldo,
      mensagem,
    }
  }

  async atualizarMovimentacao(movimentacaoId, usuario_id, updates) {
    const id = this.validarId(movimentacaoId, 'ID da movimentação')
    const usuarioId = this.validarId(usuario_id, 'usuario_id')
    const dados = this.validarDados(updates)

    const movimentacao = await movimentacoesRepository.findMovimentacaoById(id)

    if (!movimentacao || Number(movimentacao.usuario_id) !== usuarioId) {
      throw new AppError('Movimentação não encontrada para este usuário.', 404)
    }

    return await movimentacoesRepository.updateMovimentacaoById(
      id,
      usuarioId,
      dados,
    )
  }

  async deletarMovimentacao(movimentacaoId, usuario_id) {
    const id = this.validarId(movimentacaoId, 'ID da movimentação')
    const usuarioId = this.validarId(usuario_id, 'usuario_id')

    const quantidadeExcluida =
      await movimentacoesRepository.deleteMovimentacaoById(id, usuarioId)

    if (quantidadeExcluida === 0) {
      throw new AppError('Movimentação não encontrada para este usuário.', 404)
    }

    return quantidadeExcluida
  }
}

const movimentacoesService = new MovimentacoesService()
export { movimentacoesService }
