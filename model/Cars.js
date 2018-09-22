const fs = require("fs")
const util = require('util')
const Car = require('./Car')

const writeFile = util.promisify(fs.writeFile)
const readFile = util.promisify(fs.readFile)

class Cars {
    constructor(fileName) {
        this.cars = []
        this.fileName = fileName
        this.load()
    }

    load() {
        readFile(this.fileName, 'utf8')
            .then(data => JSON.parse(data))
            .then(carsList => carsList
                .forEach(car => this.add(new Car(car))))
    }

    getAll() {
        return this.cars
    }

    getById(id) {
        if (!this.cars[id - 1]) throw Error(`Cannot find a car with ${id}`)
        return this.cars[id - 1]
    }

    add(car) {
        if (!car instanceof (Car))
            throw new Error('car is not instance of Car class')
        this.cars.push(car)
    }

    save() {
        writeFile(this.fileName, JSON.stringify(this.cars, null, "\t"), "utf8")
    }

    edit(id, car_partial) {
        if (!this.cars[id - 1]) throw Error(`Cannot find a car with ${id}`)
        this.cars[id - 1] = {...this.cars[id - 1], ...car_partial}
        return this.cars
    }

    delete(id) {
        if (!this.cars[id - 1]) throw Error(`Cannot find a car with ${id}`)
        this.cars.splice(id - 1, 1)
        return this.cars
    }
}

module.exports = Cars