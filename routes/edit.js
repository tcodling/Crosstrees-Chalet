const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/:id', (req, res) => {
    const view = 'partials/edit'

    fs.readFile('./data.json', 'utf8', (err, data) => {
        if(err) throw err
        const users = JSON.parse(data)
        const pageId = Number(req.params.id)
        const currentUser = users.people.find(user => user.id === pageId)
        
        const viewData = {
            id: currentUser.id,
            name: currentUser.name,
            drink: currentUser.drink,
            sugars: currentUser.sugars,
            milk: currentUser.milk,
            image: currentUser.image
        }
    
        res.render(view, viewData)
    })
})

router.post('/:id', (req, res) => {
    fs.readFile('./data.json', 'utf8', (err, data) => {
        if (err) console.log('An error has occurred')

        const users = JSON.parse(data)
        const pageId = Number(req.params.id)
        const currentUser = users.people.find(item => item.id === pageId)
        
        users.people[pageId - 1] = {
            id: currentUser.id,
            name: req.body.name,
            drink: req.body.drink,
            sugars: Number(req.body.sugars),
            milk: Number(req.body.milk),
            image: req.body.image || '/images/default.jpg'
        }
        
        const userJSON = JSON.stringify(users, null, 2)
        fs.writeFile('./data.json', userJSON, (err, _) => {
            if (err) console.log('An error has occurred')
        })
        res.redirect(`/profile/${req.params.id}`)
    })
})


module.exports = router