const router = require("express").Router();
const mongoose = require("mongoose");
const users = require("../models/users.model")
const roles = require("../models/roles.model")
const bcrypt = require('bcrypt');
const { db } = require("../models/users.model");
const saltRounds = 10;
const jwt = require('jsonwebtoken')
const access_token_secret = "3544aed3b86913dfb110c8236bef34473bcc50c400c8f333fa7768ad56ff9bab1e5b596036cfdc5d29fb9c8cb78e41638cc39834f91421051b325876483293760efec7ccadea9343d0dfdd39f55d7b83b248c816aa61fc80f645d67f0e6f806d05613df1b8893815f43ff6d7faaad0d6d32f7899cd381724e83d39f55851c9e6"
const refresh_token_secret = "5bf46d1aa7510d01263ce5e67c275752cc7fe1d6c4d966b415b1d3ff70a89d1d0eda03661bc1e31c4a2fe60989fe9291bcb739a0492e8264060a25be8efb1e78d45a8ebb5e63a2efdd096df967750765c69cba8026da289123deee052189c2864d7f68dfb87be51b1d05edd4d6c5e2b0e6cbd8f161afde795a87e0d65c2c3146"

//send JWT for authenticate Users
async function send_JWT(email, res){
  const access_token = jwt.sign(email, access_token_secret)
  res.json({access_token: access_token})
};

router.get("/", (req, res) => {
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
  

router.post("/create", (req, res) => {
    bcrypt.hash(req.body['password'], saltRounds, function(err, hash) {
        console.log(hash)
        const create_users = new users ({
            firstname: req.body['firstname'],
            lastname: req.body['lastname'],
            email: req.body['email'],
            role: req.body['role'],
            password: hash,
            });
            create_users.save().then(() => console.log("users created"));
            res.end()
    });
});

router.post("/login", (req, res) => {    
  async function check_user_existing(){
    const checked_users = await users.find({email:req.body.email})
    if (!checked_users[0]) {
      res.json("Mot de passe ou email invalide")
      console.log("[i] No user in BDD")
    }
    else{
      console.log("User exist", checked_users)
      console.log("[i] Checking the validity of the password")
      let bool = bcrypt.compareSync(req.body.password,checked_users[0].password)

      if (bool != true) {
        res.json("Mot de passe ou email invalide")
      }
      else {
        send_JWT(req.body.email,res);
      }
    }
  }
  check_user_existing()
});

module.exports = router;
