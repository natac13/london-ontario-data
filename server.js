import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
mongoose.Promise = require('bluebird')

const isDevelopment = process.env.NODE_ENV !== 'production'

if (isDevelopment) {
  require('dotenv').load()
}

/** Webpack imports ***/
import webpack from 'webpack'
import config from './webpack.config.js'

/** Initial Data ***/
import data from './app/resources/stopIDMap.json'

import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
/** Mongo Connection using mongoose **/

mongoose.connect(isDevelopment ? process.env.MONGO_DEV : process.env.MONGO_URI)
  .then(function connectSuccess () {
    if (isDevelopment) {
      console.log('Connected to local mongoDB')
    } else {
      console.log('Connected to mongoDB through mongoLab')
    }
  })
  .catch(function error (error) {
    throw error
  })

import routeController from './server/controllers/routes'
import stopController from './server/controllers/stops'
import apiController from './server/controllers/api'

let app = express()

const compiler = webpack(config)
const webpackOptions = {
  publicPath: config.output.publicPath,
  quiet: false,
  // hides all the bundling file names
  noInfo: true,
  // adds color to the terminal
  stats: {
    colors: true
  }
}

const port = process.env.PORT || 3087

app.use(webpackMiddleware(compiler, webpackOptions))
app.use(webpackHotMiddleware(compiler))

app.use('/api', apiController)
/** Route to client side to obtain the data. ***/
app.get('/api/all_stops', (req, res) => {
  res.json(data)
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.use('/route', routeController)
app.use('/stop', stopController)

app.listen(port, 'localhost', () => {
  console.log('Listening on Port ' + port)
})
