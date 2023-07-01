var express = require('express')
var mongoose = require('mongoose')
var app = express()
var router = require('./router.js')
const configDB = require('./config/configDB.js')

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connect mongoose
configDB()

// Added router
app.use('/api', router);

app.listen(8080, () => console.log("App listening at port 8080"));