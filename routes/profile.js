const express = require('express')

const router = express.Router()

const fs = require('fs')

router.get('/:id', (req, res) => {
    fs.readFile('./data.json', 'utf8', (err, data) => {
        if (err) console.log('An error has occurred')

        const userData = JSON.parse(data)
        const pageId = Number(req.params.id)
        const people = userData.people.find(item => item.id === pageId)
        const viewData = {
            id: people.id,
            name: people.name,
            drink: people.drink,
            sugar: people.sugars,
            milk: people.milk,
            image: people.image
        }

        const view = 'partials/profile'
        res.render(view, viewData)
    })
    
})

module.exports = router