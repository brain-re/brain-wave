const dotenv = require('dotenv').config({path: __dirname + '/.env'});
const router = require("express").Router();
const jwt = require('jsonwebtoken');

function refresh_token(req,res){
  const authHeader = req.headers['authorization']
  var token = authHeader && authHeader.split(' ')[1]
  token = token.replace(/['"]+/g, '');
  jwt.verify(token, process.env.access_token_secret, (err, decoded) => {
    if (err) {
      console.log("[!] user use expired or invalid cookies")
      res.status(401);
    }
    else{
      var p1 = new Promise(function(resolve,reject){
      var refreshed_token = jwt.sign({
        user: decoded.email,
        role: decoded.role
      }, process.env.access_token_secret, { expiresIn: process.env.jwt_time_expire});
      resolve(refreshed_token)
      })
      p1.then((refreshed_token) => {
        console.log("[+] refreshing cookies")
        res.json({bearer: refreshed_token})
        res.end();
      })
    }
  })
}

router.get("/refresh_token", (req, res) => {
  refresh_token(req, res)
});

module.exports = router;