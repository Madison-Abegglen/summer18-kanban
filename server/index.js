const express = require('express')
const server = express()
const app = require('http').createServer(server)
const cors = require('cors')
const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/../client/dist/'))

const whitelist = ['http://localhost:8080', 'https://bumble-kanban.herokuapp.com/']
const corsOptions = {
  origin: function (origin, callback) {
    const originIsWhitelisted = whitelist.indexOf(origin) !== -1
    callback(null, originIsWhitelisted)
  },
  credentials: true
}
server.use(cors(corsOptions))

// Fire up database connection
require('./server-assets/db/mlab-config')

// REGISTER MIDDLEWEAR
const bp = require('body-parser')
server.use(bp.json())
server.use(bp.urlencoded({
  extended: true
}))

// REGISTER YOUR AUTH ROUTES BEFORE YOUR GATEKEEPER, OTHERWISE YOU WILL NEVER GET LOGGED IN
let auth = require('./server-assets/auth/routes')
server.use(auth.session)
server.use(auth.router)

// Gate Keeper Must login to access any route below this code
server.use((req, res, next) => {
  if (!req.session.uid) {
    return res.status(401).send({
      error: 'Please login to continue'
    })
  }
  next()
})

// YOUR ROUTES HERE!!!!!!
const boardRoutes = require('./server-assets/routes/board')
const listRoutes = require('./server-assets/routes/list')
const taskRoutes = require('./server-assets/routes/task')
server.use('/api/boards', boardRoutes)
server.use('/api/lists', listRoutes)
server.use('/api/tasks', taskRoutes)

server.use('/api/*', (error, req, res, next) => {
  res.status(400).send(error)
})

// Catch all
server.use('*', (req, res, next) => {
  res.status(404).send('<h1 align="center">404 NO PAGE HERE</h1>')
})


server.listen(port, () => {
  console.log(`Server started on port: ${port}`)
})