export function errorMiddleware(err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }

  const statusCode = err.statusCode || 500
  const message = statusCode === 500 ? 'Erro interno do servidor.' : err.message

  if (statusCode === 500) {
    console.error(err)
  }

  return res.status(statusCode).json({ message })
}
