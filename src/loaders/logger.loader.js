/**
 * @description Loggers usando winston
 */

//Modules
const { createLogger, format, transports } = require('winston')
require('winston-daily-rotate-file')

const startLogger = () => {
  return new Promise(async (resolve, reject) => {
    try {
      /**
       * INFO LEVELS
       * { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
       */

      //Constantes
      const logDir = env.DIR_LOGS
      const logFormat = format.printf(
        (info) =>
          `${info.label} ${info.timestamp} ${info.level} --> ${JSON.stringify(
            info.message
          )}`
      )
      const logLabel = format.label({
        label: '[LOGGER]',
      })
      const logToUpperCase = format((info) => {
        info.level = info.level.toUpperCase()
        return info
      })

      //All logs
      const dailyRotateFileTransport = new transports.DailyRotateFile({
        filename: `${logDir}/%DATE%.log`,
        datePattern: 'YYYY-MM-DD', // HH:mm:ss,
      })

      //Only error
      const dailyRotateFileTransportError = new transports.File({
        filename: `${logDir}/error.log`,
        level: 'error',
      })

      //Only console
      const dailyRotateFileTransportConsole = new transports.Console({
        level: 'debug',
        format: format.combine(
          logLabel,
          logToUpperCase(),
          format.colorize(),
          logFormat
        ),
      })

      const logger = createLogger({
        level: 'debug',
        format: format.combine(
          logLabel,
          logToUpperCase(),
          format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
          }),
          logFormat
        ),
        transports: [
          dailyRotateFileTransportConsole,
          dailyRotateFileTransportError,
          dailyRotateFileTransport,
        ],
      })

      logger.stream = {
        write: (message, encoding) => {
          logger.info(message)
        },
      }

      //Add to global
      global.logger = logger

      return resolve(logger)
    } catch (error) {
      return reject(error)
    }
  })
}

module.exports = { startLogger }
