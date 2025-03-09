const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, default: 0 },
  image: { type: String, required: true }, // If uploading images, you may store the file path here.
  description: { type: String }, // Add description if needed
  reviews: { type: Number, default: 0 } // Add review count if needed
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
