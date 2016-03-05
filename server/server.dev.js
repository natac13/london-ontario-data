import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
mongoose.Promise = require('bluebird')

/** Initial Data ***/
import data from '../app/resources/stopIDMap.json'
require('dotenv').load()
const port = process.env.PORT || 3087

/** Webpack imports ***/
import webpack from 'webpack'
import config from '../webpack.config.js'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
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
app.use(webpackMiddleware(compiler, webpackOptions))
app.use(webpackHotMiddleware(compiler))

app.use('/api', apiController)
app.use('/fetch', fetchController)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'))
})

app.use('/stop', stopController)
/** Route to client side to obtain the data. ***/
app.get('/api/all_stops', (req, res) => {
  res.json(data)
})

app.listen(port, 'localhost', () => {
  console.log('Listening on Port ' + port)
})
