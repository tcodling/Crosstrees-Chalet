const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/', (req, res) => {
    fs.readFile('./data.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        if (err) console.log('An error has occurred')
        const viewData = {
            people: data.people 
        }
        res.render('partials/index.hbs', viewData)
    })
})

router.post('/', (req, res) => {
    fs.readFile('./data.json', 'utf8', (err, data) => {
        if (err) console.log('An error has occurred')

        const userData = JSON.parse(data)
            const newPerson = {
                id: userData.people.length + 1,
                name: req.body.name,
                image: "/images/default.jpg",
                drink: req.body.drink,
                sugars: req.body.sugars,
                milk: req.body.milks
            }
        userData.people.push(newPerson)
        const dataString = JSON.stringify(userData, null, 2)
        fs.writeFile('./data.json', dataString, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
                res.redirect('/')
            }
        })
    }
)})

module.exports = router