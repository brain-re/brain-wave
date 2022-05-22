const router = require("express").Router();
const dotenv = require('dotenv').config({path: __dirname + '/.env'});
const jwt = require('jsonwebtoken');

//list date for all request to the server
router.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
  });

//logger in cas of need
const logger  = (req, res, next) => {
    console.log('URL :', req.url)
    console.log('parametre:', req.params)
    console.log('query:', req.query)
    console.log('body:',req.body)
    console.log('hearders:', req.headers)
    next()
}
router.use(logger)


const rights = {
  "/api/roles": ['62463c087ad782107e12ff7a']
}


const check_user = async function check_token(req, res, next){
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
        var api_url_request = req.originalUrl
        var test = JSON.stringify(rights[api_url_request])
        var roles_decoded = JSON.stringify(decoded.role)
        // parcourir les tableau et next si une occurence est valide
        if (roles_decoded == test){
          next()
        }
      }
    })
    }
  }


const product = require("./products");
router.use("/api/products", product)

const categorie = require("./categories")
router.use("/api/categories", categorie)

const user = require("./users")
router.use("/api/users", user)

const check = require("./token")
const role = require("./roles")
router.use("/api/roles",check_user, role)

const token = require("./token")
router.use("/api/token", token)

module.exports = router;
