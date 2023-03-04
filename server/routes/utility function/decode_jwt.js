const dotenv = require('dotenv').config({path: __dirname + '/.env'});
const jwt = require('jsonwebtoken');

exports.decode_bearer = function decode_bearer(req){
    const authHeader = req.headers['authorization']
    var token = authHeader && authHeader.split(' ')[1]
    var decode_token = jwt.verify(token, process.env.access_token_secret, (err, decoded) => {
    if (err) {
      console.log("[!] Something wrong")
    }
    else {
      return decoded
    }
    })
    return decode_token
  }

