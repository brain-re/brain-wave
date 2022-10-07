const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongodb = require('./helpers/mongo-db');
const logger = require("morgan");
const app = express();
const index = require("./routes/index");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongodb.connect();

app.use(index);

app.listen(app.get("port"), function () {
  console.log(`express listening on port ${app.get("port")}!`);
});

module.exports = app;
