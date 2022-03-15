const mongoose = require("mongoose");

const TravelUserSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  location: { type: String, required: true },
  cost_of_travel: { type: Number, required: true },
  places_to_visit: { type: String },
  transportation: { type: String, required: true },
  saftey: { type: String, required: true },
  hotels_to_stay: { type: String },
  famous_food: { type: String, required: true },
  your_experience: { type: String, required: true },
  images_of_location: { type: Array },
  Others: { type: String },
});

module.exports = mongoose.model("TravelUser", TravelUserSchema);
