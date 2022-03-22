const res = require('express/lib/response')
const houses = require('./db.json')
let globalID = 4

module.exports = {
    getAllHouses: (req, res) => {
        res.status(200).send(houses)
    },

    createHouse: (req, res) => {
        let { address, price, imageURL } = req.body
        let newHouse = {
            id: globalID,
            address, 
            price, 
            imageURL
        }
        houses.push(newHouse)
        res.status(200).send(houses)
        globalID ++
    },

    deleteHouse: (req, res) => {
        let index = houses.findIndex(house => house.id === +req.params.id)
        houses.splice(index, 1)
        res.status(200).send(houses)
    },

    updateHouse: (req, res) => {
        let { id } = req.params
        let { type } = req.body

        let index = houses.findIndex(house => house.id === +id)
        
        if (houses[index].price <= 10000 && type === 'minus') {
            houses[index].price = 0
            res.status(200).send(houses)
        } else if (type === 'plus') {
            (houses[index].price += 10000)
            res.status(200).send(houses)
        } else if (type === 'minus') {
            (houses[index].price -= 10000)
            res.status(200).send(houses)
        } else {
            res.status(400)
        }
    }

}
