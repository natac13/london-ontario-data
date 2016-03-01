import mongoose, { Schema } from 'mongoose'

const Route = new Schema({
  ID: String,
  name: String,
  directions: [String]
})

export default mongoose.model('Route', Route)
