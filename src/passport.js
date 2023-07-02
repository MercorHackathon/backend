const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
			scope: [
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
			  ],
		},
		function (accessToken, refreshToken, profile, callback) {
			profile.accessToken=accessToken;
			profile.refreshToken=refreshToken;
			callback(null, profile);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
