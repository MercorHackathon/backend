require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/fitAuth");
const cookieSession = require("cookie-session");

const app = express();

app.use(
	cookieSession({
		name: "session",
		keys: ["mercor"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		credentials: true,
	})
);

app.use("/auth", authRoute);
// Added router

app.listen(8080, () => console.log("App listening at port 8080"));