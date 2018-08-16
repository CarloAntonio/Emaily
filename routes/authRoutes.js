const passport = require("passport");

const keys = require("../config/keys");

module.exports = app => {
  //setup route and use passport middleware to authenticate
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  //setup route and use passport to exchage code for profile
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys"); //redirect sends you to a new route on client
    }
  );

  //setup logout route
  app.get("/api/logout", (req, res) => {
    req.logout(); //remove id from cookie
    res.redirect("/"); //send use to landing page
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
