let carsList = ''

function renderAllCars(carsJsonUrl) {
    carsList = ``
    fetch(carsJsonUrl)
        .then(data => data.json())
        .then(cars => {
            if (!cars)
                carsList = `<h3>No cars found! you can <a href="/cars/add">add a new car</a></h3>`
            else
                cars.forEach(renderCar)
            const carsDiv = document.querySelector('#cars-list')
            carsDiv.innerHTML = carsList
            carsDiv.querySelectorAll('.deleteCar').forEach(deleteCar)
            carsDiv.querySelectorAll('.editCar').forEach(editCar)
        })
        .catch(err => console.log(err))
}

renderAllCars('/api/cars')

// --------------------------
function renderCar(car, index) {
    index++
    carsList += `
    <div id="carDiv-${index}" class="col-lg-3 col-md-4 col-sm-6 mb-2">
        <div class="card">
            <img class="pl-2 pr-2 car-icon"
                src='public/images/icons/car%20(${index % 11 === 0 ? 1 : index % 11}).svg' />
            <div class="card-body">
              <p class="card-text">
                <b>color: </b> 
                <i class="fa fa-circle" style="color:${car.color}"></i> 
                ${car.color}<br />
                <b>model: </b>${car.model}<br />
                <b>brand: </b>${car.brand}<br />
              </p>
              <a class="btn btn-sm btn-primary viewCar" id="${index}" href="/${index}">
                <i class="ti-eye" aria-hidden="true"></i>
              </a>
              <a class="btn btn-sm btn-warning text-white editCar" id="${index}" href="#">
                <i class="ti-pencil-alt" aria-hidden="true"></i>
              </a>
              <a class="btn btn-sm btn-danger deleteCar" id="${index}" href="#">
                <i class="ti-trash" aria-hidden="true"></i>
              </a>
            </div>
        </div>
      </div>`
}

// --------------------------
document.querySelectorAll(`#filters input[type='text']`)
    .forEach(input => {
        input.addEventListener('keyup', function () {
            renderAllCars(`/api/cars?${this.id}=${this.value}`)
        })
    })

// --------------------------
// add a car
document.querySelector('#saveCar').addEventListener('click', saveCar)

function saveCar() {
    const car = {
        color: document.querySelector('#car-color').value,
        model: document.querySelector('#car-model').value,
        brand: document.querySelector('#car-brand').value
    }
    try {
        ['color', 'model', 'brand'].forEach(key => {
            if (car[key].trim().length === 0)
                throw new Error(`${key} must not be empty`)
        })

        fetch('/api/cars', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
            .then(() => {
                $('#addCarModal').modal('hide')
                renderAllCars('/api/cars')
            })
            .catch(err => alert(err))
    } catch (error) {
        alert(error)
    }
}

// --------------------------

function deleteCar(button) {
    button.addEventListener('click', function (event) {
        event.preventDefault()
        const id = parseInt(this.id)


        fetch(`/api/cars/${id}`, {
            method: 'delete'
        })
            .then(() => document.querySelector(`#carDiv-${id}`).remove())
            .catch(err => alert(err))
    })
}

// --------------------------
function editCar(button) {
    button.addEventListener('click', function (event) {
        event.preventDefault()
        const id = parseInt(this.id)
        const colorInput = document.querySelector('#car-color-edit')
        const modelInput = document.querySelector('#car-model-edit')
        const brandInput = document.querySelector('#car-brand-edit')
        document.querySelector('#updateCar').setAttribute('data-carid', id)

        fetch(`/api/cars/${id}`)
            .then(data => data.json())
            .then(car => {
                colorInput.value = car.color
                modelInput.value = car.model
                brandInput.value = car.brand
                $('#editCarModal').modal()
            })
            .catch(err => alert(err))
    })
}

// --------------------------
document.querySelector('#updateCar')
    .addEventListener('click', function () {
        const car = {
            color: document.querySelector('#car-color-edit').value,
            model: document.querySelector('#car-model-edit').value,
            brand: document.querySelector('#car-brand-edit').value
        }
        const id = this.dataset.carid
        fetch(`/api/cars/${id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
            .then(() => {
                renderAllCars('/api/cars')
                $('#editCarModal').modal('hide')
            })
            .catch(err => alert(err))


    })