const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");

const keys = require("./config/keys");

//import with no assignment
require("./models/User");
require("./services/passport");

//connect to mongoose, (url from mlab config)
mongoose.connect(keys.mongoURI);

//setup express
const app = express();

//make use of cookies
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

//use cookies to manage authentication
app.use(passport.initialize());
app.use(passport.session());

//connect routes
require("./routes/authRoutes")(app);

// Dynamic Port Binding
const PORT = process.env.PORT || 5000;
app.listen(PORT);
