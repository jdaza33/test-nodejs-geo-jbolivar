/**
 * @description Manejo de errores
 */

const errorHandler = (err, req, res, next) => {
  let code = 500
  let error = null
  console.log(err)

  if (err.TypeError) logger.error(err.TypeError)

  if (err.code && [401, 403, 404].includes(err.code)) {
    error = err.error
    code = err.code
  } else {
    error = err.toString()
  }

  logger.error(error)
  return res.status(code).json({
    success: 0,
    error,
  })
}

module.exports = { errorHandler }
