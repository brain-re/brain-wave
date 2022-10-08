const dotenv = require('dotenv').config({path: __dirname + '/.env'});
const router = require("express").Router();
const jwt = require('jsonwebtoken');
var funct_decode_bearer = require('./utility function/decode_jwt').decode_bearer;

function refresh_token(req,res){
  jwt_decoded = funct_decode_bearer(req)
  console.log(jwt_decoded)
  
  var p1 = new Promise(function(resolve,reject){
    var refreshed_token = jwt.sign({
      user: jwt_decoded.email,
      roles: jwt_decoded.roles,
      firstname: jwt_decoded.firstname,
      lastname: jwt_decoded.lastname,
      email: jwt_decoded.email,
      iat : Math.round(new Date().getTime() / 1000)
    }, process.env.access_token_secret, { expiresIn: process.env.jwt_time_expire});
    resolve(refreshed_token)
    })
    p1.then((refreshed_token) => {
      console.log("[+] refreshing cookies")
      res.json({bearer: refreshed_token})
      res.end();
    })
  }


router.get("/refresh_token", (req, res) => {
  refresh_token(req, res)
});

module.exports = router;