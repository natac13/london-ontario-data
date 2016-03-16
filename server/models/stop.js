import mongoose, { Schema } from 'mongoose'

const options = { timestamps: true } // will add createdAt and updatedAt fields
const Stop = new Schema({
  name: String,
  route: String,
  routeName: String,
  direction: String,
  stop: String
}, options)

// can effectively query for (stop) or (stop and route)
Stop.index({ stop: 1, route: 1 })

export default mongoose.model('Stop', Stop)
