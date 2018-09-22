const Cars = require('../model/Cars')
const Car = require('../model/Car')
const my_cars = new Cars("cars.json")

class CarsApiController {
    static getAllCars(req, res) {
        res.render('index', {title: 'Cars Gallery'})
    }

    static getCarById(req, res) {
        try {
            res.render('viewCar', {
                id: req.params.id,
                car: my_cars.getById(req.params.id),
                title: 'View Car'
            })
        } catch (error) {
            res.status(404).send(`Error ${error}`)
        }
    }

    static editCarById(req, res) {
        try {
            my_cars.edit(req.params.id, req.body)
            my_cars.save()
            res.send(my_cars.getAll())
        } catch (error) {
            res.status(404).send(`Error ${error}`)
        }
    }

    static addCar(req, res) {
        try {
            const car = new Car(req.body)
            my_cars.add(car)
            my_cars.save()
            res.send(my_cars.getAll())
        } catch (error) {
            res.status(404).send(error)
        }
    }

    static deleteCarById(req, res) {
        try {
            my_cars.delete(req.params.id)
            my_cars.save()
            res.send(my_cars.getAll())
        } catch (error) {
            res.status(404).end()
        }
    }
}

module.exports = CarsApiController