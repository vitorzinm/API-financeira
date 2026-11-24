import { movimentacoesService } from './movimentacoes.service.js'

class MovimentacoesController {
  async store(req, res) {
    const { descricao, valor, data, receita, efetivado } = req.body ?? null

    const movimentacao = await movimentacoesService.cadastroMovimentacao({
      descricao,
      valor,
      data,
      receita,
      efetivado,
    })

    return res.status(201).json({ movimentacao })
  }

  async show(req, res) {
    const { id } = req.params

    const movimentacaoId = await movimentacoesService.getMovimentacaoById(id)
    return res.status(200).json({ movimentacaoId })
  }

  async index(req, res) {
    const movimentacoes = await movimentacoesService.getAllMovimentacoes()
    return res.status(200).json(movimentacoes)
  }

  async movimentacoesDeEntrada(req, res) {
    const movimentacoesDeEntrada =
      await movimentacoesService.movimentacoesDeEntrada()
    return res.status(200).json({ movimentacoesDeEntrada })
  }

  async movimentacoesDeSaida(req, res) {
    const movimentacoesDeSaida =
      await movimentacoesService.movimentacoesDeSaida()
    return res.status(200).json({ movimentacoesDeSaida })
  }

  async extrato(req, res) {
    const { dataInicio, dataFim } = req.query ?? {}
    const extrato = await movimentacoesService.getExtrato(dataInicio, dataFim)
    console.log('Retorno do service:', extrato)
    return res.status(200).json({ extrato })
  }

  async extratoPendente(req, res) {
    const { dataIncio, dataFim } = req.query ?? {}
    const extratoPendente = await movimentacoesService.getExtratoPendente()
    return res.status(200).json({ extratoPendente })
  }

  async update(req, res) {
    const { id } = req.params
    const { descricao, valor, data, receita, efetivado } = req.body ?? {}
    const movimentacaoId = await movimentacoesService.atualizarMovimentacao(
      id,
      {
        descricao,
        valor,
        data,
        receita,
        efetivado,
      },
    )
    return res.status(200).json({ movimentacaoId })
  }

  async destroy(req, res) {
    const { id } = req.params
    const movimentacaoId = await movimentacoesService.deletarMovimentacao(id)
    return res.status(200).json({ movimentacaoId })
  }
}

const movimentacoesController = new MovimentacoesController()
export { movimentacoesController }
