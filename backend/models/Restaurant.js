const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  locatioin:{
    type: String
  },
  email:{
    type:String, 
    unique:true,
    required: true 
  },
  password:{
    type:String,
    required: true 
  },
  // rating: { type: Number, default: 0 },
  logo: { type: String }, // If uploading images, you may store the file path here.
  banner: { type: String }, 
  description: { type: String }, // Add description if needed
  // reviews: { type: Number, default: 0 } // Add review count if needed
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
