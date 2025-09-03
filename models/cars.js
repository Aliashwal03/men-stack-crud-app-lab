const mongoose = require('mongoose')

const carsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
})

const car = mongoose.model('Cars', carsSchema)
module.exports = car