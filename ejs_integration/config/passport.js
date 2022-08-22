// NO PROBLEM HERE

// const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/user");

// const GoogleStrategy = require('passport-google-openidconnect').Strategy;

var GoogleStrategy = require("passport-google-oauth2").Strategy;

require("dotenv").config();

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
        scope: ["profile"],
      },
      async function (accessToken, refreshToken, profile, done) {
        try {
          console.log("reaching this part.");
          let user = await User.findOne({ googleId: profile.id });
          if (user) {
            console.log("user is there");
            done(null, user);
          } else {
            const newUser = {
              // mistake
              googleId: profile.id,
              name: profile.displayName,
              photo: profile.photos[0].value,
            };
            user = await User.create(newUser);
            console.log("creating new user");
            done(null, user);
          }
        } catch (err) {
          console.log("There is an error.");
          console.error(err);
        }
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
