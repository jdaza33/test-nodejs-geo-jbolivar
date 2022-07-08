/**
 * @description Rutas de endpoints
 */

//Modules
const express = require('express')
const route = express.Router()

//Controllers
const { listBikesNearby, insertBikes } = require('../controllers/bike.ctrl')

//Endpoints

/** BIKES */
route.get('/stations', listBikesNearby)
route.get('/insert-bikes', insertBikes)

module.exports = route
