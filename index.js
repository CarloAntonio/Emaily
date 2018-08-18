const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");

const keys = require("./config/keys");

//import with no assignment
require("./models/User");
require("./models/Survey");
require("./services/passport");

//connect to mongoose, (url from mlab config)
mongoose.connect(keys.mongoURI);

//setup express
const app = express();

//use body parser
app.use(bodyParser.json());

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
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // express will serve up production assets
  // like main.js file, or main.css file
  app.use(express.static("client/build"));

  // express will serve yo the index.html file
  // if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  }); //catch all
}

// Dynamic Port Binding
const PORT = process.env.PORT || 5000;
app.listen(PORT);
