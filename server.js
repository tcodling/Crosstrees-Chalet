const express = require('express')
const hbs = require('express-handlebars')
const server = express()
const homepageRouter = require('./routes/homepage')
const profileRouter = require('./routes/profile')
const editRouter = require('./routes/edit')

// tRouter = require('./routes/edit')Middidleware
server.engine('hbs', hbs({
  defaultLayout: 'main',
  extname: 'hbs'
}))
server.set('view engine', 'hbs')
server.use(express.static('public'))
server.use(express.urlencoded({extended: false}))

server.use('/profile', profileRouter)
server.use('/edit', editRouter)
server.use('/', homepageRouter)

module.exports = server