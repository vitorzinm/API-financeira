export function errorMiddleware(err, req, res, next) {
  const statusCode = err.statusCode
  const message = err.message

  return res.json({ message }).status(statusCode)
}
