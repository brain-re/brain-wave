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



const role_administrator = '62463c087ad782107e12ff7a'
const role_user = '6288df5bfb6f79012342f80a'
const role_creator = '6288dfd888de3002084436fb'



const rights = {
  "/api/roles": [[role_administrator]],
  "/api/roles/create": [[role_administrator]],

  "/api/products/like": [[role_administrator],[role_creator],[role_user]],
  "/api/products/create_user": [[role_administrator],[role_creator]],
  "/api/products/delete": [[role_administrator],[role_creator]],

  "/api/users/search":[[role_administrator]],
  "/api/users/create":[[role_administrator]],
  "/api/users/updatepassword":[[role_administrator],[role_creator],[role_user]],

  "/api/categories/create":[[role_administrator],[role_creator]],
  "/api/users/create_power_user":[[role_administrator]],

  "/api/token/refresh_token":[[role_administrator],[role_creator],[role_user]],

  "/api/entreprises/create": [[role_administrator]]
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
      console.log("[!] no valid token")
      res.status(401);
      res.end();
    }
    
   jwt.verify(token, process.env.access_token_secret, (err, decoded) => {
    if (err) {
      console.log("[!] user use invalid cookies")
      console.log(err)
      res.status(404).send("[!] Cookie validity expired");
      res.end();
    }
    else{
      var roles_decoded = JSON.stringify(decoded.roles)
      
      var right_control = new Promise(function(resolve,reject){
        //On parse pour eviter une erreur suite a l'ajout de fonction via le ?
        parsed_url = req.originalUrl.split('?')
        
        rights[parsed_url[0]].forEach(element => {
          element = JSON.stringify(element)
          console.log("itération tableau=", element)
          console.log(roles_decoded)
          if (roles_decoded == element){
            resolve()
          }
        })
        reject()
      })
      
      right_control.then(() => {
        next()
      }, () => {
        console.log("[!] user has invalid right for his request")
        res.status(401)
        res.end()
      })
    }
  })
  }
}

const products = require("./products");
router.use("/api/products/create", check_user, products)
router.use("/api/products/like", check_user, products)
router.use("/api/products/search", products)
router.use("/api/products/delete", check_user, products)
router.use("/api/products", products)

const categorie = require("./categories")
router.use("/api/categories/create", check_user, categorie)
router.use("/api/categories/search", categorie)
router.use("/api/categories", categorie)

const user = require("./user")
router.use("/api/user/current", check_user, user)

const users = require("./users")
router.use("/api/users/create_user", users)
router.use("/api/users/create_power_user", check_user, users)
router.use('/api/users/search',check_user, users)
router.use("/api/users/login", users)
router.use("/api/users/updatepassword", check_user, users)
router.use("/api/users", users)

const roles = require("./roles")
router.use("/api/roles/create", check_user, roles)
router.use("/api/roles/search", check_user, roles)
router.use("/api/roles", roles)

const token = require("./token")
router.use("/api/token",check_user, token)

const global_rights = require('./client_check_rights/check_rights.js')
router.use("/api/is_granted", global_rights)

const specific_rights = require('./client_check_rights/specific_rights.js')
router.use("/api/specific_granted/delete", specific_rights)

const entreprises_create = require('./principale/entreprises/create_entreprises.js')
router.use("/api/entreprises/create", check_user, entreprises_create)

const entreprises_propositions = require('./principale/entreprises/propose_entreprises')
router.use("/api/entreprises/proposition", entreprises_propositions)

module.exports = router;
