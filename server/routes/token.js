const dotenv = require('dotenv').config({path: __dirname + '/.env'});
const router = require("express").Router();
const jwt = require('jsonwebtoken');
const { exists } = require('../models/users.model');

async function refresh_token (req, res){
  if (req.headers['authorization'] == undefined){
      console.log("[!] no token")
      res.status(403);
  }
  else{
    const authHeader = req.headers['authorization']
    var token = authHeader && authHeader.split(' ')[1]
    token = token.replace(/['"]+/g, '')
    jwt.verify(token, process.env.access_token_secret, (err, decoded) => {
      if (err) {
        console.log("[!] user use expired or invalid cookies")
        res.status(403);
      }
      else{
        console.log(decoded)
        const NewToken = jwt.sign({
           data : decoded.data
        }, process.env.access_token_secret, { expiresIn: process.env.jwt_time_expire});
        console.log("[+] refreshing cookies")
        res.json({bearer: token})
      }
    })
  }
};

router.get("/refresh_token", (req, res) => {
  refresh_token(req, res)
  res.end();
});

router.get("/", (req, res, next) => {
  console.log(req.headers['authorization'])
  async function check_token(req, res, next){
    if (req.headers['authorization'] == undefined){
      console.log("[!] no token")
      res.status(403);
      res.end();
    }
    else{
    const authHeader = req.headers['authorization']
    var token = authHeader && authHeader.split(' ')[1]
    token = token.replace(/['"]+/g, '')
    jwt.verify(token, process.env.access_token_secret, (err, decoded) => {
      if (err) {
        console.log("[!] user use expired or invalid cookies")
        res.status(403);
        res.end();
      }
      else{
        next()
      }
    })
    }
  }
  check_token(req,res,next)
});


module.exports = router;