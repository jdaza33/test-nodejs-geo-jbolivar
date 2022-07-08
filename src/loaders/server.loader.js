/**
 * @description Server
 */

// Modules
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const paginate = require('express-paginate')
const compression = require('compression')

//Middlewares
const { errorHandler } = require('../middlewares/error.middleware')

//Routes
const router = require('../routes/router')

const startExpress = () => {
  return new Promise(async (resolve, reject) => {
    try {
      //APP
      const app = express()

      //Middlewares
      app.use(cors())
      app.use(helmet())
      app.use(express.json())
      app.use(paginate.middleware(10, 50))
      app.use(compression())

      //Router
      app.use('/', router)

      //Error
      app.use(errorHandler)

      return resolve(app)
    } catch (error) {
      return reject(error)
    }
  })
}

module.exports = { startExpress }
