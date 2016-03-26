



/* Not being used */









import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import morgan from 'morgan'
import bodyParser from 'body-parser'
mongoose.Promise = require('bluebird')

const port = process.env.PORT || 3087
const isDevelopment = process.env.NODE_ENV === 'development'
const isTesting = process.env.NODE_ENV === 'test'
const isDemo = process.env.NODE_ENV === 'demo'

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

// import stopController from './controllers/stops'
import apiController from './controllers/api'
import fetchController from './controllers/fetch'

let app = express()
// server and database modifications based off the NODE_ENV
if (isDevelopment || isTesting) {
  require('dotenv').config()
  /** Mongo Connection using mongoose **/
  mongoose.connect(process.env.MONGO_DEV)
    .then(function connectSuccess () {
      console.log('Connected to local mongoDB')
    })
    .catch(function error (error) {
      throw error
    })
} else if (isDemo) {
  require('dotenv').config()
  mongoose.connect(process.env.MONGO_URI)
    .then(function connectSuccess () {
      console.log('Connected to mongoDB through mongoLab')
    })
    .catch(function error (error) {
      throw error
    })
}

if (isDevelopment) {
  app.use(morgan('dev'))
  app.use(webpackMiddleware(compiler, webpackOptions))
  app.use(webpackHotMiddleware(compiler))
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../build')))

app.use('/api', apiController)
app.use('/fetch', fetchController)
// app.use('/stop', stopController)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'))
})

app.listen(port, 'localhost', () => {
  console.log('Listening on Port ' + port)
})
export default app
