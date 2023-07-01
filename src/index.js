var express = require('express')

var app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send("Hello world");
})

app.listen(8080, () => console.log("App listening at port 8080"));