import { expect } from 'chai'
import mongoose from 'mongoose'
import request from 'supertest'
import app from '../../server/test'

import Stop from '../../server/models/stop.js'

describe('API for Bus Stops', () => {
  describe('MongoDB connection', () => {
    it('should connect successfully to database ltc', (done) => {
      expect(mongoose.connection.name).to.equal('ltc')
      done()
    })
  })

  describe('Fetching Bus Stops', () => {
    it('should return a list of Stop objects', (done) => {
      request(app)
        .get('/api/all_stops')
        .expect(200)
        .expect('Content-type', /json/)
        .end((error, result) => {
          expect(Array.isArray(result.body)).to.equal(true)
          expect(result.body.length).to.be.above(3000)
          done(error)
        })
    })
  })

})
