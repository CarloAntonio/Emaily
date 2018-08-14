const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

const keys = require("../config/keys");

//fetch a type of model from mongoose (in this case, users)
const User = mongoose.model("users");

//serialize modal
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

//setup passport
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      //reach out to database to see if profile already exist
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          //profile exist, do not create new user
          done(null, existingUser);
        } else {
          //no profile exit, create new user
          new User({
            googleId: profile.id
          })
            .save() //persist data in mongo
            .then(user => {
              done(null, user); //wait til saved to mongo and call done
            });
        }
      });
    }
  )
);
