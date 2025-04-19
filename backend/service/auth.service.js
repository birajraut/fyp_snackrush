const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("../helper/jwt");
const { generateOTP } = require("../helper/generateOPT");
const { sendEmail } = require("../helper/nodemailer");
const { radisClient } = require('../config/radis');
const { OAuth2Client } = require('passport-google-oauth20')


const registerUserService = async (data) => {
  const { email, password, role, } = data;
  const user = await User.findOne({ email: email });
  if (user) {
    throw new Error("User already exists");
  } else {

    const hash = bcrypt.hashSync(data.password, 10);


    const otp = generateOTP(6)
    console.log(otp)
    const newData = {
      ...data,
      password: hash,
      otp: otp
    };
    await sendEmail(email, 'otp', otp)
    const client = await radisClient()
    client.set(email, JSON.stringify(newData))
    return 'OPT send to user email'
  }
};

const OauthUserService = async (data) => {
  try {
    // 1. Check if the user already exists based on the data (e.g., email)
    let user = await User.findOne({ email: data.email });

    console.log('al google', data)

    // If the user is not found, register the user
    if (!user) {
      // Register new user (you can add additional data from the OAuth response here)
      const useData = new User({
        email: data.email,
        fullName: data.name,
        image: data.picture,
        isGoogleUser: true
      });

      // Save user to the database
      user = await useData.save();
    }

    // 2. Generate access and refresh tokens
    console.log('u', user)
    const payload = {
      id: user._id.toString()
    }
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);




    // 3. Return tokens or user data (whichever is needed)
    return { accessToken, refreshToken };

  } catch (error) {
    console.error('Error in OauthUserService:', error);
    throw new Error('Something went wrong during OAuth authentication');
  }
}

const OTPVerifyService = async (email, otp) => {
  const client = await radisClient()
  const userData = await client.get(email);
  const newUserData = JSON.parse(userData)
  if (newUserData.otp !== otp) {
    throw new Error('Please provide valid OTP')
  } else {
    const newUser = new User(newUserData);
    const savedUser = await newUser.save();
    await client.del(email) // delete cache from radis
    return savedUser;
  }

}
const loginUserService = async (data) => {
  const { email, password } = data;
  // password hash

  const user = await User.findOne({
    email,
  });
  if (!user) {
    throw new Error("User Not Found");
  }
  const hash = bcrypt.compareSync(password, user.password);
  if (!hash) {
    throw new Error("Incorrect Password");
  }

  const payload = {
    id: user._id,
  };
  const accessToken = generateAccessToken(payload);

  const returnData = {
    accessToken,
    user: user
  }
  return returnData;
};


const resetPasswordService = async ({ email, otp, newPassword }) => {
  const user = await User.findOne({
    email
  });
  if (!user) {
    throw new Error("User Not Found");
  }
  const client = await radisClient()
  const userData = await client.get(email);
  const newUserData = JSON.parse(userData)
  if (newUserData.otp !== otp) {
    throw new Error('Please provide valid OTP')
  } else {
    const hash = bcrypt.hashSync(newPassword, 10);
    user.password = hash;
    await user.save();
    await client.del(email) // delete cache from radis
    return 'Password reset successfully';
  }
}



const forgotPasswordService = async (email) => {
  const user = await User.findOne({
    email
  });
  if (!user) {
    throw new Error("User Not Found");
  }
  const otp = generateOTP(6)
  await sendEmail(email, 'otp', otp)
  const client = await radisClient()
  client.set(email, JSON.stringify({ otp: otp }))
  return 'OPT send to user email'
}

// const googleClient = new OAuth2Client(process.env.FROM_EMAIL);

const googleLogin = async (requestAnimationFrame, res) => {
  try {
    const { token } = req.body;
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, sub: googleId } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        fullName: name,
        email,
        googleId,
        isGoogleUser: true,
      });
      await user.save();
    }

    const accessToken = generateAccessToken({ id: user._id });

    res.json({ token: accessToken, fullName: user.fullName });
  } catch (error) {
    console.error('Google Login Error:', error);
    res.status(401).json({ message: 'Google Login Failed' });
  }
};

module.exports = { registerUserService, loginUserService, OTPVerifyService, googleLogin, OauthUserService,resetPasswordService,forgotPasswordService };



