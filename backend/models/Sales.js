const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1']
  },
  sale_date: {
    type: Date,
    default: Date.now
  },
  payment_status: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed','Cash On Delivery'],
    default: 'Pending'
  },


});

module.exports = mongoose.model('Sale', SaleSchema);

