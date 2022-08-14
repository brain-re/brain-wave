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

router.get("/search", (req, res) => {
  if (req.query.search === undefined) {
    run_100_last()
  } else {
    run_search()
  }
  
  async function run_search(){
    search_users = req.query.search
    //The part below permit to insensitive the query
    const regex = new RegExp(search_product, 'i')
    const user = await users.find({ $or: [{ name : {$regex: regex}},{ description : {$regex: regex}} ]})
    res.json(user)
    res.end()
  }

  async function run_100_last(){
    const user = await users.find().sort({ _id: -1 }).limit(100).populate("role")
    res.json(user)
    res.end()
  }
});
  
router.post("/login", (req, res) => {
  async function check_user_existing(){
    const checked_users = await users.find({email:req.body.email})
    if (!checked_users[0]) {
      res.json("Mot de passe ou email invalide")
      console.log("[i] No user in BDD")
    }             
    else{
      console.log("[i] User exist : ", checked_users, "ID :", checked_users[0]._id)
      console.log("[i] Checking the validity of the password")
      let bool = bcrypt.compareSync(req.body.password,checked_users[0].password)
      if (bool != true) {
        res.json(403, "Mot de passe ou email invalide")
      }
      else {
        send_JWT(checked_users[0],res);
      }
    }
  }
  check_user_existing()
});

router.post("/create", (req, res) => {
    bcrypt.hash(req.body['password'], saltRounds, function(err, hash) {
        console.log(hash)
        const create_users = new users ({
          firstname: req.body['firstname'],
          lastname: req.body['lastname'],
          email: req.body['email'],
          roles: req.body['role'],
          password: hash,
          });
        create_users.save(function(err){
          if (err) {
            console.log(err);
            res.send(400, 'Bad Request or user already exist')
            res.end()
          }
          else{
            res.json("[+]User created")
            res.end()
          }
        })
    });
});

module.exports = router;
