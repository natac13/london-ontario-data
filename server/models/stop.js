import mongoose, { Schema } from 'mongoose'

const Stop = new Schema({
  name: String,
  route: String,
  routeName: String,
  direction: String,
  stop: String
})

export default mongoose.model('Stop', Stop)
