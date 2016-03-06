import express from 'express'
import compression from 'compression'
import path from 'path'
import mongoose from 'mongoose'
mongoose.Promise = require('bluebird')

/** Mongo Connection using mongoose **/

mongoose.connect(process.env.MONGO_URI)
  .then(function connectSuccess () {
    console.log('Connected to mongoDB through mongoLab')
  })
  .catch(function error (error) {
    throw error
  })

import stopController from './controllers/stops'
import apiController from './controllers/api'
import fetchController from './controllers/fetch'

let app = express()
app.use(compression())
app.use(express.static(path.join(__dirname, '../build')))

const port = process.env.PORT || 3087
app.use('/api', apiController)
app.use('/fetch', fetchController)
app.use('/stop', stopController)

app.listen(port, () => {
  console.log('Listening on Port ' + port)
})
