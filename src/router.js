var express = require('express')
const login = require('./routes/login')
const register = require('./routes/register')
var router = express.Router()


// Add routes here
router.post("/register", register);
router.get("/login", login)

module.exports = router