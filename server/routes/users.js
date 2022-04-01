const router = require("express").Router();
const mongoose = require("mongoose");
const users = require("../models/users.model")
const roles = require("../models/roles.model")
const bcrypt = require('bcrypt');
const saltRounds = 10;

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


module.exports = router;
