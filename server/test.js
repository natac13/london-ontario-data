import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
mongoose.Promise = require('bluebird')

require('dotenv').load()

/** Mongo Connection using mongoose **/
mongoose.connect(process.env.MONGO_DEV)
  .then(function connectSuccess () {
    console.log('Connected to local mongoDB')
  })
  .catch(function error (error) {
    throw error
  })

import stopController from './controllers/stops'
import apiController from './controllers/api'
import fetchController from './controllers/fetch'

let app = express()
app.use(bodyParser.json())
app.use('/api', apiController)
app.use('/fetch', fetchController)
app.use('/stop', stopController)


app.listen(process.env.PORT || 3000, () => {
  console.log('omg')
})

export default app

