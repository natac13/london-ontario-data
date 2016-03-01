import express from 'express'

import Route from '../models/route'

const router = express.Router()

router.get('/', function handleGetRequestHome (req, res) {
  res.send('your endpoint is working')
})

router.get('/:id', async function handleGetRequest (req, res, next) {
  const result = await Route.findOne({ 'ID': req.params.id })
  res.json(result)
})

export default router
