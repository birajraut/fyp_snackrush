const {
  registerUserService,
  loginUserService,
  OTPVerifyService
} = require("../service/auth.service");
const {
  userSchema,
  loginSchema,
} = require("../utils/validator/userValidation");

const regitserUser = async (req, res, next) => {
    try {
      const { body } = req;
      userSchema.parse(body);
      
      const resp = await registerUserService(body);
      res.json({
        result: resp,
        message: "User Registered",
      });
    } catch (error) {
      console.error(error); // Log the error for debugging
      if (error.message === 'User already exists') {
        res.status(400).json({ message: 'User already exists' });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  };

  const OTPVerify = async (req, res, next)=>{
    try {
      const {email, otp} = req.body
      if(!otp && !email){
        throw new Error('OTP and email required')
      }
      const resp = await OTPVerifyService(email, otp)
      res.json({
        result:resp, 
        mesage:'User Created'
      })
    } catch (error) {
      next(error)
    }
  }

const loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const newData = {
        email,
        password,
      };
      loginSchema.parse(newData);
      
      const resp = await loginUserService(newData);
      res.json({
        result: resp,
        message: "Login Success",
      });
    } catch (error) {
      console.error(error); // Log the error for debugging
      if (error.message === 'User Not Found' || error.message === 'Incorrect Password') {
        res.status(400).json({ message: 'Invalid email or password' });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  };

module.exports = { regitserUser, loginUser, OTPVerify };
