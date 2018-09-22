const {Router} = require('express')

const CarsApiController = require('../controller/CarsApiController')
const cars_route = Router()

cars_route
    .get('/', CarsApiController.getAllCars)
    .get('/:id', CarsApiController.getCarById)
    .post('/', CarsApiController.addCar)
    .patch('/:id', CarsApiController.editCarById)
    .delete('/:id', CarsApiController.deleteCarById)

module.exports = cars_route