if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'demo') {
  module.exports = require('./server/server.prod')
} else {
  module.exports = require('./server/server.dev')
}
