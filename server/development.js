import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import morgan from 'morgan'
mongoose.Promise = require('bluebird')

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

// import stopController from './controllers/stops'
import apiController from './controllers/api'
import fetchController from './controllers/fetch'

let app = express()
app.use(morgan('dev'))
app.use(webpackMiddleware(compiler, webpackOptions))
app.use(webpackHotMiddleware(compiler))

app.use('/api', apiController)
app.use('/fetch', fetchController)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'))
})

// app.use('/stop', stopController)

app.listen(port, 'localhost', () => {
  console.log('Listening on Port ' + port)
})
export default app
