const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    type: String
  },
  address: {
    type: String,
    required: true
  },

lat:{
  type: String,
  required: false
},

lng:{
  type: String,
  required: false
},

  logo: { type: String },
  banner: { type: String },
  description: { type: String },
  phone: {
    type: String
  },
  status: {
    type: String,
    enum: ['PENDING', 'ACCEPTED', 'REJECTED'],
    required: true,
    default: 'PENDING',
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
