if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'demo') {
  require('./server/production')
} else if (process.env.NODE_ENV === 'test') {
  console.log('using test server')
  require('./server/test')
} else {
  require('./server/development')
}
