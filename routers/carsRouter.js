const {Router} = require('express')

const CarsController = require('../controller/CarsController')
const cars_route = Router()

cars_route
    .get('/', CarsController.getAllCars)
    .get('/:id', CarsController.getCarById)
    .post('/', CarsController.addCar)
    .patch('/:id', CarsController.editCarById)
    .delete('/:id', CarsController.deleteCarById)

module.exports = cars_route