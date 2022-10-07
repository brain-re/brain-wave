const dotenv = require('dotenv').config({path: __dirname + '/.env'});
const router = require("express").Router();
const mongoose = require("mongoose");
const users = require("../models/users.model")
const roles = require("../models/roles.model")
const bcrypt = require('bcrypt');
const { db, validate } = require("../models/users.model");
const saltRounds = 10;
const jwt = require('jsonwebtoken');

//send JWT for authenticate Users
async function send_JWT(check_user,res){
  var token = jwt.sign({
    user: check_user.id,
    roles: check_user.roles,
    firstname: check_user.firstname,
    lastname: check_user.lastname,
    email: check_user.email,
    iat : Math.round(new Date().getTime() / 1000)
  }, process.env.access_token_secret, { expiresIn: process.env.jwt_time_expire});
  res.json({bearer: token})
  res.end()
};

router.get("/current", (req, res) => {
});
  


module.exports = router;
