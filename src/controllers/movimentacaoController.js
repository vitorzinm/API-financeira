import { movimentacoesService } from '../services/movimentacaoService.js'

class MovimentacoesController {
  async store(req, res, next) {
    try {
      const movimentacao = await movimentacoesService.cadastroMovimentacao(
        req.body,
      )

      return res.status(201).json({ movimentacao })
    } catch (err) {
      return next(err)
    }
  }

  async showByMovimentacaoId(req, res) {
    const { id } = req.params

    const movimentacaoId = await movimentacoesService.getMovimentacaoById(id)
    return res.status(200).json({ movimentacaoId })
  }
  async showByUserId(req, res) {
    const { usuario_id } = req.params
    const movimentacoes = await movimentacoesService.getUser(usuario_id)
    return res.status(200).json(movimentacoes)
  }

  // async index(req, res) {
  //   const movimentacoes = await movimentacoesService.getAllMovimentacoes()
  //   return res.status(200).json(movimentacoes)
  // }

  async movimentacoesDeEntrada(req, res) {
    const { usuario_id } = req.params
    const movimentacoesDeEntrada =
      await movimentacoesService.movimentacoesDeEntrada(usuario_id)
    return res.status(200).json({ movimentacoesDeEntrada })
  }

  async movimentacoesDeSaida(req, res) {
    const { usuario_id } = req.params
    const movimentacoesDeSaida =
      await movimentacoesService.movimentacoesDeSaida(usuario_id)
    return res.status(200).json({ movimentacoesDeSaida })
  }

  async extrato(req, res) {
    const { usuario_id, dataInicio, dataFim } = req.query ?? {}
    const extrato = await movimentacoesService.getExtrato(
      usuario_id,
      dataInicio,
      dataFim,
    )
    console.log('Retorno do service:', extrato)
    console.log(usuario_id, dataInicio, dataFim)
    return res.status(200).json({ extrato })
  }

  async extratoPendente(req, res) {
    const { usuario_id, dataInicio, dataFim } = req.query ?? {}
    const extratoPendente = await movimentacoesService.getExtratoPendente(
      usuario_id,
      dataInicio,
      dataFim,
    )
    return res.status(200).json({ extratoPendente })
  }

  async update(req, res, next) {
    try {
      const { id, usuario_id } = req.params

      const movimentacaoId = await movimentacoesService.atualizarMovimentacao(
        id,
        usuario_id,
        req.body,
      )

      return res.status(200).json({ movimentacaoId })
    } catch (err) {
      return next(err)
    }
  }

  async destroy(req, res) {
    const { id, usuario_id } = req.params
    const movimentacaoId = await movimentacoesService.deletarMovimentacao(
      id,
      usuario_id,
    )
    return res.status(200).json({ movimentacaoId })
  }
}

const movimentacoesController = new MovimentacoesController()
export { movimentacoesController }
