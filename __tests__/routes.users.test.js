/* eslint-env jest */
const express = require("express");
const request = require("supertest");
const mongoose = require("mongoose");
const router = require("../routes");
const database = require("../models/index");

const app = express();

app.use("/", router);

beforeEach((done) => {
  mongoose.connect(database.URL);
  const db = mongoose.connection;
  db.on("error", (err) => {
    done.fail(err);
  });
  db.once("open", () => {
    done();
  });
});

afterEach((done) => {
  mongoose.connection.close();
  done();
});

describe("Test GET method", () => {
  describe("getAll() for /users", () => {
    it("responds to /users", async () => {
      const res = await request(app).get("/users");
      console.log(res.body);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.statusCode).toBe(200);
    });
  });
  
  describe("getById() for /users/:id", () => {
    it("responds to /users/:id", async () => {
      const res = await request(app).get("/users/6611dbe833656b5f691c1293");
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.statusCode).toBe(200);
    });
  });
});
