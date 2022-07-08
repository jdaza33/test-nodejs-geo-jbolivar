/**
 * @description Conexion a la base de datos de MongoDB
 */

const mongoose = require('mongoose')

const startMongoose = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const connection = await mongoose.connect(env.URL_DATABASE, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })

      logger.info(`Base de datos conectada con éxito`)

      return resolve(connection)
    } catch (error) {
      return reject(error)
    }
  })
}

module.exports = { startMongoose }
