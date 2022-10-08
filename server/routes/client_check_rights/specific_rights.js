const dotenv = require('dotenv').config({path: __dirname + '/.env'});
const router = require("express").Router();
const jwt = require('jsonwebtoken');
var funct_decode_bearer = require('../utility function/decode_jwt.js').decode_bearer;
var run_search_by_propriety = require('../utility function/bdd_query').run_search_by_propriety

router.get("/", (req, res) => {
  jwt_decoded = funct_decode_bearer(req)
  var p1 = new Promise(function(resolve){
    try{
      user_propriety = run_search_by_propriety(jwt_decoded.user)
      resolve(user_propriety)
    }
    catch{
      res.status(401).send("[+] Bad bearer for this API")
      res.end()
    }
  })
  p1.then((user_propriety) => {
    if (user_propriety[0] === undefined){
      res.status(401).send(false)
      res.end()
    }
    else{
      res.status(200).json(user_propriety)
    }
  })
});

module.exports = router;