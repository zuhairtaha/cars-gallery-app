const Cars = require('../model/Cars')
const Car = require('../model/Car')
const my_cars = new Cars("cars.json")

class CarsApiController {
    static getAllCars(req, res) {
        let carsList = my_cars.getAll()
        Car.keysArray.forEach(key => {
            const queryKey = req.query[key]
            if (queryKey) {
                carsList = carsList.filter(car => {
                    const regex = new RegExp(`^${queryKey}`, 'i')
                    return regex.test(car[key])
                })
            }
        })
        res.send(carsList)
    }
    // --------------------------------------------------
    static getCarById(req, res) {
        try {
            res.send(my_cars.getById(req.params.id))
        } catch (error) {
            res.status(404).send(`Error ${error}`)
        }
    }
    // --------------------------------------------------
    static editCarById(req, res) {
        try {
            my_cars.edit(req.params.id, req.body)
            my_cars.save()
            res.send(my_cars.getAll())
        } catch (error) {
            res.status(404).send(`Error ${error}`)
        }
    }
    // --------------------------------------------------
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
    // --------------------------------------------------
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