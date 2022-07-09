/**
 * @description Controlador de bicicletas
 */

//Services
const { listBikes, insertBikesInitial } = require('../services/bike.srv')

const listBikesNearby = async (req, res, next) => {
  try {
    const bikes = await listBikes(req.query)
    res.json({ success: true, bikes })
  } catch (error) {
    next(error)
  }
}

const insertBikes = async (req, res, next) => {
  try {
    await insertBikesInitial()
    res.json({ success: true })
  } catch (error) {
    next(error)
  }
}

module.exports = { listBikesNearby, insertBikes }
