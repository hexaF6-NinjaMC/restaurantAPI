const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
// const Joi = require("joi");
// const mongoose = require("mongoose");

const passport = require("passport");
const mongodb = require("./data/database"); // unsure if this is needed with mongoose

// TO ADD
// MONGOOSE CODES (CONNECTION FUNCTION) AND SCHEMAS?
// JOI CODES (SCHEMAS?)

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
        ? `<p>Logged in as ${req.session.user.email}.</p>
			<ul>
				<li>Admin level is "${req.session.user["op-lvl"]}".</li>
				<li>Admin displayName is "${req.session.user.displayName}".</li>
				<li>Admin fname is "${req.session.user.given_name}".</li>
				<li>Admin lname is "${req.session.user.family_name}".</li>
				<li>Admin created on "${req.session.user.created}".</li>
				<li>Admin displayName is "${req.session.user}".</li>
				<li>Admin profilePic: <img src="${req.session.user.photos[0].value}" referrerpolicy="no-referrer">.</li>
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
    req.session.user.op_lvl = 1; // Update value with retrieved mongodb record
    req.session.user.created = "YYYY-MM-DD"; // Update value with retrieved mongodb record; need to convert to locale date string!
    // req.session.user.op_lvl = 1; // Update value with retrieved mongodb record
    console.log(req.session.user);
    res.redirect("/auth/admin/success");
  }
);

app.get(
  // #swagger.ignore = true
  "/auth/user/google/callback",
  passport.authenticate("user", { scope: ["profile", "email"] }),

  (req, res) => {
    req.session.user = req.user;
    res.redirect("/auth/user/success");
  }
);

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
