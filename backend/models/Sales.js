const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number, // unit price
        required: true
      }
    }
  ],
  total_cost: {
    type: Number,
    required: true
  },
  sale_date: {
    type: Date,
    default: Date.now
  },
  payment_status: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed','Cash On Delivery'],
    default: 'Pending'
  }
});

module.exports = mongoose.model('Sale', SaleSchema);
