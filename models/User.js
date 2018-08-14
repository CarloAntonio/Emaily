const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});

//create new collection
mongoose.model("users", userSchema);
