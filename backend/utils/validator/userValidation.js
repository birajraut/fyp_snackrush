const { z } = require('zod');

const userSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  // address: z.string().min(1, 'Address is required'),
  // contactNumber: z.string().min(1, 'Contact number is required')
});

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

module.exports = { userSchema, loginSchema }