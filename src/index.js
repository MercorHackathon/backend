var express = require('express')
var mongoose = require('mongoose')
var router = require('./router.js')
const configDB = require('./config/configDB.js')

require("dotenv").config();
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/fitAuth");
const cookieSession = require("cookie-session");


const app = express();
// Connect mongoose
configDB()


app.use(
	cookieSession({
		name: "session",
		keys: ["mercor"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

// Added router
app.use('/api', router);
app.use("/auth", authRoute);

app.listen(8080, () => console.log("App listening at port 8080"));