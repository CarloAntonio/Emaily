const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys"); //instead of requiring for future testing

module.exports = app => {
  app.get("/api/surveys/thanks", (req, res) => {
    res.send("Thanks for voting!");
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    //create survey
    const survey = new Survey({
      title,
      body,
      subject,
      recipients: recipients.split(",").map(email => ({ email: email.trim() })), //es6
      _user: req.user.id,
      dateSent: Date.now()
    });

    //set email
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      //send email
      await mailer.send();

      //save survey
      await survey.save();

      //deduct credit
      req.user.credits -= 1;
      const user = await req.user.save();

      //respond to client
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
