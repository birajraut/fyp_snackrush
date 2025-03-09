const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  address: { type: String },
  contactNumber: { type: String },
  googleId: { type: String }, // For Google OAuth
  isGoogleUser: { type: Boolean, default: false }, // To differentiate Google users
  isVerified: { type: Boolean, default: false } // ✅ Track email verification status
}
);

module.exports = mongoose.model('User', UserSchema);