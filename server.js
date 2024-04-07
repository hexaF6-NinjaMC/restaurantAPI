/**
 * Let's serve the Restaurant API!
 */

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
// const Joi = require("joi");
// const mongoose = require("mongoose");

const passport = require("passport");
const database = require("./models");

const { strategies } = require("./middleware/passport-strategies");

// Use passport strategies (AKA "call them")
strategies();

const app = express();

const port = process.env.PORT || 8080;

app
  .use(bodyParser.json())
  .use(
    bodyParser.urlencoded({
      extended: true
    })
  )
  .use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
  })
  .use(cors({ methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"] }))
  .use(cors({ origin: "*" }))
  .use("/", require("./routes"))
  .use("/api-docs", (req, res) => {
    res.send("<h1>API Documentation</h1>"); // Needs updating with SwaggerUI
  })
  .use(express.static("./frontend", { root: __dirname }));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get(
  // #swagger.ignore = true
  "/",
  (req, res) => {
    res.send(
      req.session.user !== undefined
        ? `<p>Logged user in with email <b>${req.session.user.email}</b>.</p>
			<ul>
			  <li>Logged user as Admin/Manager is <b>${req.session.user.isAdmin}</b>.</li>
			  <li>Logged user level is <b>${req.session.user.op_lvl}</b>.</li>
			  <li>Logged user displayName is <b>${req.session.user.displayName}</b>.</li>
			  <li>Logged user fname is <b>${req.session.user.given_name}</b>.</li>
			  <li>Logged user lname is <b>${req.session.user.family_name}</b>.</li>
			  <li>Logged user created on <b>${req.session.user.created}</b>.</li>
			  <li>Logged user profilePic:<br><img src="${req.session.user.photos[0].value}" referrerpolicy="no-referrer"></li>
			</ul>`
        : "<p>Logged out.</p>"
    );
  }
);

app.get(
  // #swagger.ignore = true
  "/auth/admin/google/callback",
  passport.authenticate("admin", { scope: ["profile", "email"] }),

  (req, res) => {
    req.session.user = req.user;
    req.session.user.isAdmin = true; // Used to check if some operations are permitted
    req.session.user.op_lvl = 1; // Update value with retrieved mongodb record
    req.session.user.created = "YYYY-MM-DD"; // Update value with retrieved mongodb record; need to convert to locale date string!
    res.redirect("/auth/admin/success");
  }
);

app.get(
  // #swagger.ignore = true
  "/auth/user/google/callback",
  passport.authenticate("user", { scope: ["profile", "email"] }),

  (req, res) => {
    req.session.user = req.user;
    req.session.user.isAdmin = false;
    req.session.user.created = "YYYY-MM-DD"; // Update value with retrieved mongodb record; need to convert to locale date string!
    res.redirect("/auth/user/success");
  }
);

/* eslint-disable-next-line no-unused-vars */
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});

database.mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on ${port}`);
    });
  })
  .catch((err) => {
    console.error("Connection to database failed", err);
    process.exit(1);
  });
