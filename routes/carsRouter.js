const router = require('express').Router()

//connect to the database
const db = require('../data/connection')


//Create a new car entry in the DB
router.post('/', validateCarData, (req, res) => {
    db('cars')
        .insert(req.carData)
        .then(([id]) => {
            console.log(id)
            res.status(201).json(id)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ errorMessage: error.message })
        })
})

//Get a list of cars
router.get('/', (req, res) => {
    db('cars')
        .select('*')
        .then(cars => {
            if (cars.length) {
                res.status(200).json({ data: cars })
            }
            else {
                res.status(404).json({ errorMessage: "No cars list found" })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ errorMessage: error.message })
        })
})

//Get a car by ID
router.get('/:id', (req, res) => {
    const { id } = req.params

    db('cars')
        .select('*')
        .where('id', id)
        .first()
        .then(car => {
            if (car) {
                res.status(200).json({ data: car })
            }
            else {
                res.status(404).json({ errorMessage: `Car with ID ${id} not found` })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ errorMessage: error.message })
        })
})

//Delete a car entry from the DB
router.delete('/:id', (req, res) => {
    const { id } = req.params

    db('cars')
        .where('id', id)
        .del()
        .then(count => {
            if (count) {
                res.status(200).json({ message: "Record deleted successfully" })
            }
            else {
                res.status(404).json({ errorMessage: "Record not found" })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ errorMessage: error.message })
        })
})

//Update an entry
router.put('/:id', validateCarData, (req, res) => {
    const { id } = req.params

    db('cars')
        .where('id', id)
        .update(req.carData)
        .then(count => {
            if (count) {
                res.status(200).json({ message: "Record updated successfully" })
            }
            else {
                res.status(404).json({ errorMessage: "Record not found" })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ errorMessage: error.message })
        })
})

//Custom middleware
function validateCarData(req, res, next) {
    const carData = req.body

    if (
        carData.VIN &&
        carData.make &&
        carData.model &&
        carData.mileage
    ) {
        req.carData = req.body
        next()
    }
    else {
        res.status(400).json({ errorMessage: "Please provide car VIN, make, model and mileage!" })
    }
}

module.exports = router