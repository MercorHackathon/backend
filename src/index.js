var express = require('express')
var app = express()
var router = require('./router.js')

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Added router
app.use('/api', router);

app.listen(8080, () => console.log("App listening at port 8080"));