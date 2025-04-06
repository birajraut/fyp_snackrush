const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  address: { type: String },
  contactNumber: { type: String },
  googleId: { type: String }, // For Google OAuth
  isGoogleUser: { type: Boolean, default: false }, // To differentiate Google users
  isVerified: { type: Boolean, default: false }, // ✅ Track email verification status
  image: { type: String },
  stripe_customer_id: {
    type: String,
    unique: true
  },
  role: {
    type: String,
    enum: ['ADMIN', 'USER'],
    required: true,
    default: 'USER',
  },
}
);

module.exports = mongoose.model('User', UserSchema);