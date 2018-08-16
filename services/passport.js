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
    async (accessToken, refreshToken, profile, done) => {
      //reach out to database to see if profile already exist
      const existingUser = await User.findOne({ googleId: profile.id }); //async, await

      //check for existing user
      if (existingUser) {
        //profile exist, do not create new user
        return done(null, existingUser);
      }

      //no profile exit, create new user
      const user = await new User({ googleId: profile.id }).save(); //persist data in mongo
      done(null, user); //wait til saved to mongo and call done
    }
  )
);
