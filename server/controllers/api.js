import express from 'express'
const router = express.Router()

import Route from '../models/route'

router.get('/routes', async function getHandler (req, res) {
  const query = {}
  const projection = { '_id': false, '__v': false }
  const options = { lean: true }
  try {
    const result = await Route.find(query, projection, options)
    res.json(result)
  } catch (err) {
    const error = {
      message: 'Error querying DB for the list of routes',
      _error: err
    }
    res.json(error)
  }
})

router.get('/routes/:id', async function getHandler (req, res) {
  const query = { 'ID': req.params.id }
  const projection = { '_id': false, '__v': false }
  const options = { lean: true }
  try {
    const result = await Route.findOne(query, projection, options)
    res.json(result)
  } catch (err) {
    const error = {
      message: 'Error querying DB for the route you asked for',
      _error: err
    }
    res.json(error)
  }
})

export default router
