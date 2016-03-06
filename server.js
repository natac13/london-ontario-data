if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'demo') {
  require('./server/production')
} else {
  require('./server/development')
}
