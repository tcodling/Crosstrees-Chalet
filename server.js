const express = require('express')
const hbs = require('express-handlebars')

const server = express()
module.exports = server

const art = require('./art.json')

// Middleware
server.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: false
}))
server.set('view engine', 'hbs')
server.use(express.static('public'))

// Routes

server.get('/', (req, res) => {
  const viewData = {
    title: 'Gallery',
    art: art
  }
  res.render('home', viewData)
})

server.get('/artworks/:id', (req, res) => {
  const piece = art.find((element) => element.id == req.params.id)
  console.log(art.find(element => {
    console.log(element.id)
  }))
  const viewData = {
    artwork: piece.artwork
  }
  res.render('artworks', viewData)
})
