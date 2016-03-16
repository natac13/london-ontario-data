import mongoose from 'mongoose'

after((done) => {
  console.log(mongoose.connection.name)
  mongoose.connection.close()
    .then(() => {
      console.log('Connection to DB closed')
      done()
    })
})
