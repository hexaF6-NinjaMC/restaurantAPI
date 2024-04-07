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
  describe("getAll() for /inventory", () => {
    it("responds to /inventory", async () => {
      const res = await request(app).get("/inventory");
      console.log(res.body);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.statusCode).toBe(200);
    });
  });

  describe("getById() for /inventory/:id", () => {
    it("responds to /inventory/:id", async () => {
      const res = await request(app).get("/inventory/6611d78cc6412f6c24c29be0");
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.statusCode).toBe(200);
    });
  });
});
