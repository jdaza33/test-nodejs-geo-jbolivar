/**
 * @description Servicio de bicicletas
 */

//Models
const Bike = require('../models/Bike')

//Utils
const bikesDb = require('../utils/nomeclatura.db.json')

/**
 *
 * @param {Object} filters Filtros de busqueda
 * @returns Bike
 */
const listBikes = (filters = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { latitude, longitude, distance } = filters

      if (!latitude || !longitude || !distance)
        return reject('Falta algun dato (latitude, longitude, distance)')

      const bike = await Bike.find({
        point: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [parseFloat(longitude), parseFloat(latitude)],
            },
            $maxDistance: parseFloat(distance),
          },
        },
      })
      return resolve(bike)
    } catch (error) {
      return reject(error)
    }
  })
}

/**
 *
 * @returns
 */
const insertBikesInitial = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await Bike.insertMany(
        bikesDb.map((bike) => {
          return {
            ...bike,
            status: bike.status === 'IN_SERVICE' ? true : false,
            point: {
              type: 'Point',
              coordinates: [bike.longitude, bike.latitude],
            },
          }
        })
      )

      return resolve()
    } catch (error) {
      return reject(error)
    }
  })
}

module.exports = { listBikes, insertBikesInitial }
