const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes');
const bodyParser = require('body-parser');

function server() {
  const app = express()
  // app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors())
  const port = process.env.PORT || 5000

  app.use(morgan('dev'))
  app.use('/api', routes);
  app.start = app.listen.bind(app, port, () => console.log(`Listening on port ${port}`))

  return app
}

if (require.main === module) server().start()

module.exports = server
