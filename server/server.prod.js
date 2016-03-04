import express from 'express'
import compression from 'compression'
import path from 'path'
import mongoose from 'mongoose'
mongoose.Promise = require('bluebird')

const isDemo = process.env.NODE_ENV === 'demo'
if (isDemo) {
  require('dotenv').load()
}

/** Initial Data ***/
import data from '../app/resources/stopIDMap.json'

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

const port = process.env.PORT
app.use('/api', apiController)
app.use('/fetch', fetchController)
/** Route to client side to obtain the data. ***/
app.get('/api/all_stops', (req, res) => {
  res.json(data)
})
app.use('/stop', stopController)

app.listen(port, 'localhost', () => {
  console.log('Listening on Port ' + port)
})
