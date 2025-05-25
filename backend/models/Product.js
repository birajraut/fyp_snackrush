const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String }, 
  description: { type: String },
  foodtype: { type: String },
  restaurant_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Restaurant', 
    required: true 
  },
  price:{
    type:Number,
    required:true
  }

});

module.exports = mongoose.model('Product', ProductSchema);
