import mongoose, { Schema } from 'mongoose'

const options = { timestamps: true } // will add createdAt and updatedAt fields
const Route = new Schema({
  ID: String,
  name: String,
  directions: [String]
}, options)

// create a compound index on the route ID and name fields
// meaning I can effectively query by (ID) or (ID and name)
Route.index({ ID: 1, name: 1 })

export default mongoose.model('Route', Route)
