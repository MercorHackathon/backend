var express = require('express')
const login = require('./routes/login')
const register = require('./routes/register')
const fitAuth = require('./routes/fitAuth')
var router = express.Router()


// Add routes here
router.post("/register", register);
router.get("/login", login)
router.get("/auth",fitAuth)

module.exports = router