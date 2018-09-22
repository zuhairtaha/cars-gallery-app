const express = require('express')
const {json} = require('body-parser')
const carsApiRouter = require('./routers/carsApiRouter')
const carsRouter = require('./routers/carsRouter')

const port = process.env.PORT || 8888
const app = express()

app.set('view engine', 'ejs') // npm i ejs
app.use("/public", express.static(__dirname + '/public'))
app.use(json())
app.use('/api/cars', carsApiRouter)
app.use('/', carsRouter)

app.listen(port, () => console.log(`listening on ${port}`))