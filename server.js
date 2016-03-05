if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'demo') {
  require('./server/server.prod')
} else {
  require('./server/server.dev')
}
