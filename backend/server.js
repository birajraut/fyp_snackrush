const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connect } = require("./config/db");
const { radisClient } = require("./config/radis");
const { serverErr } = require('./helper/error');
const allRoutes = require('./routes/index');

const {OauthUserService} = require('./service/auth.service')
const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;



dotenv.config();

const app = express();


app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true, 
};

app.use(cors(corsOptions)); 
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      prompt: 'select_account' 
    },
   async (_accessToken, _refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});



app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);




app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
 async  (req, res) => {

    console.log('pro', req)

    const {email, name, picture} = req?.user?._json || {}

    const data = {
      email,
      name,
      picture
    }

      const {accessToken, refreshToken, userId} = await  OauthUserService(data)

 
    res.redirect(`http://localhost:5173/redirect-oAuth?accessToken=${accessToken}&refreshToken=${refreshToken}`); // Redirect to frontend after login
  }
);



// Routes
app.use('/api/', allRoutes);

// Error handling middleware
app.use(serverErr);

const PORT = process.env.PORT || 8000;

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error connecting to port ${PORT}`);
  } else {
    connect();  // Using the `connect` function from db.js to connect to MongoDB
    radisClient()
    console.log(`Connected to port ${PORT}`);
  }
});
