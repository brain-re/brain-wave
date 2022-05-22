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


/* Info
administrator : 62463c087ad782107e12ff7a
user : 6288df5bfb6f79012342f80a
creator : 6288dfd888de3002084436fb
*/

const rights = {
  "/api/roles": [["62463c087ad782107e12ff7a"]],
  "/api/roles/create": [["62463c087ad782107e12ff7a"]],

  "/api/products": [["62463c087ad782107e12ff7a"],["6288dfd888de3002084436fb"],["6288df5bfb6f79012342f80a"]],
  "/api/products/create": [["62463c087ad782107e12ff7a"],["6288dfd888de3002084436fb"]],
  
  "/api/users":[["62463c087ad782107e12ff7a"]],
  "/api/users/create":[["62463c087ad782107e12ff7a"]],

  "/api/categories":[["62463c087ad782107e12ff7a"]],
  "/api/categories/create":[["62463c087ad782107e12ff7a"]],

  "/api/token/refresh_token":[["62463c087ad782107e12ff7a"],["6288dfd888de3002084436fb"],["6288df5bfb6f79012342f80a"]],

}

const check_user = function check_token(req, res, next){
    if (req.headers['authorization'] == undefined){
      console.log("[!] no token")
      res.status(403);
      res.end();
    }
    else{
    const authHeader = req.headers['authorization']
    var token = authHeader && authHeader.split(' ')[1]
    try {
      token = token.replace(/['"]+/g, '');
    }catch{
      res.status(401);
      res.end();
    }
    
   jwt.verify(token, process.env.access_token_secret, (err, decoded) => {
    if (err) {
      console.log("[!] user use invalid cookies")
      res.status(401);
      res.end();
    }
    else{
      var roles_decoded = JSON.stringify(decoded.role)
      var p1 = new Promise(function(resolve,reject){
        rights[req.originalUrl].forEach(element => {
        element = JSON.stringify(element)
        if (roles_decoded == element){
          resolve()
        }
        })
        reject()
      })
      p1.then(() => {
        next()
      }, () => {
        res.status(401)
        res.end()
      })
    }
  })
  }
}

const product = require("./products");
router.use("/api/products", check_user, product)
router.use("/api/products/create", check_user, product)

const categorie = require("./categories")
router.use("/api/categories", categorie)

const user = require("./users")
router.use("/api/users", user)

const check = require("./token")
const role = require("./roles")
router.use("/api/roles",check_user, role)

const token = require("./token")
router.use("/api/token",check_user, token)

module.exports = router;
