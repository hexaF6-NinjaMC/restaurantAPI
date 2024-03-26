const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database'); //unsure if this is needed with mongoose
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const Joi = require('joi');
const mongoose = require('mongoose');

//TO ADD
//MONGOOSE CODES (CONNECTION FUNCTION) AND SCHEMAS?
//JOI CODES (SCHEMAS?)

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json())
.use(bodyParser.urlencoded({
    extended: true
}))
.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true ,
}))
.use(passport.initialize())
.use(passport.session())
.use((req, res, next) => {
    res.setHeader('Access-Controll-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    res.setHeader('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS");
    next();
})
.use(cors({ methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS']}))
.use(cors({ origin: '*'}))
.use('/', require('./routes'));

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback", // change later for render
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    //User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //  return done(err, user);
    //}); -- unsure how to do this, will look into it or may need help
    return done(null, profile);
  }
));