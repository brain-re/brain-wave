'use strict'
const mongodb = require("../helpers/mongo-db");
const users = require("../models/users.model")

module.exports.up = async function(next) {
  return mongodb.connect().then(
    async() => await users.updateMany({blocked: {$exists: false}}, {$set: {blocked: false}}).exec()
  ).then(() => {
    return next();
  });
}

module.exports.down = async function (next) {
  return mongodb.connect().then(
    async() => await users.updateMany({blocked: {$exists: true}}, {$unset: {blocked: ""}}).exec()
  ).then(() => {
    return next();
  });
}