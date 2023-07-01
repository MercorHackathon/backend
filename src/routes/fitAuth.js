const router = require("express").Router();
const passport = require("passport");

router.get("/login/success", (req, res) => {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get("/google", passport.authenticate("google", [
	"profile",
	"email",
	"https://www.googleapis.com/auth/fitness.activity.read",
	"https://www.googleapis.com/auth/fitness.activity.write",
	"https://www.googleapis.com/auth/fitness.body.read",
	"https://www.googleapis.com/auth/fitness.body.write",
	"https://www.googleapis.com/auth/fitness.location.read",
	"https://www.googleapis.com/auth/fitness.location.write",
	"https://www.googleapis.com/auth/fitness.nutrition.read",
	"https://www.googleapis.com/auth/fitness.nutrition.write",
	"https://www.googleapis.com/auth/fitness.heart_rate.read",
	"https://www.googleapis.com/auth/fitness.blood_pressure.read",
	"https://www.googleapis.com/auth/fitness.blood_glucose.read",
	"https://www.googleapis.com/auth/fitness.oxygen_saturation.read",
	"https://www.googleapis.com/auth/fitness.body_temperature.read",
	"https://www.googleapis.com/auth/fitness.reproductive_health.read"
  ]));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
});

module.exports = router;
