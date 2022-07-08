/**
 * Esquema de biciletas
 */

//Modules
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Schema
const BikeSchema = new Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String, unique: false, required: true },
  obcn: { type: String, unique: false, required: true },
  location: { type: String, unique: false, required: false },
  latitude: { type: Number, unique: false, required: true },
  longitude: { type: Number, unique: false, required: true },
  status: { type: Boolean, default: true },
})

module.exports = mongoose.model('Bikes', BikeSchema)
