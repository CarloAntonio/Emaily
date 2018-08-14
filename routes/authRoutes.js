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
  app.get("/auth/google/callback", passport.authenticate("google"));

  //setup logout route
  app.get("/api/logout", (req, res) => {
    req.logout(); //remove id from cookie
    res.send(req.user);
  });

  app.get("/api/current_user", (req, res) => {
    res.sent(req.user);
  });
};
