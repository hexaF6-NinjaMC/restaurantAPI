const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.Promise = global.Promise;

const database = {};
database.mongoose = mongoose;
database.URL = process.env.MONGODB_URI;
database.inventory = require("./inv")(mongoose);
database.orders = require("./orders")(mongoose);
database.users = require("./users")(mongoose);
database.admin = require("./admin")(mongoose);

module.exports = database;
