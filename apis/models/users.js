const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: { type: String, require: true, unique: true },
  email: {
    type: String,
    require: true,
    unique: true,
    match:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  password: { type: String, require: true },
});

module.exports = mongoose.model("User", UserSchema);
