const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema(
  {
    address: {
      building: String,
      coord: [Number],
      street: String,
      zipcode: String,
    },
    city: String,
    cuisine: String,
    grades: [
      {
        date: Date,
        grade: String,
        score: Number,
      },
    ],
    name: String,
    restaurant_id: String,
  },
  { collection: "Restaurants" },
);

module.exports = mongoose.model("Restaurant", RestaurantSchema);
