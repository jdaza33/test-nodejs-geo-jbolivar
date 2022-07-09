/**
 * @description Server
 */

require('dotenv').config()

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

  return app
}

const startExpressTest = () => {
  const app = startExpress()
  app.listen(process.env.PORT, () =>
    console.log(`Test listening on port ${process.env.PORT}`)
  )
  return app
}

module.exports = { startExpress, startExpressTest }
