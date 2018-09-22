class Car {
    constructor(obj) {
        if (JSON.stringify(Object.keys(obj)) !== JSON.stringify(Car.keysArray))
            throw new Error(`Car obj should have keys ${Car.keysArray}`)
        Car.keysArray.forEach(key => this[key] = obj[key])
    }

    static get keysArray() {
        return ['color', 'model', 'brand']
    }
}

module.exports = Car