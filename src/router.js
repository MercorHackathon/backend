var express = require('express')
const login = require('./routes/login')
const register = require('./routes/register')
const search = require('./routes/search');
var router = express.Router()


// Add routes here
router.post("/register", register);
router.get("/login", login)
router.get("/auth",fitAuth)
router.get('/search', search)

module.exports = router