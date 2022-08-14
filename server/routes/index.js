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



const administrator = '62463c087ad782107e12ff7a'
const user = '6288df5bfb6f79012342f80a'
const creator = '6288dfd888de3002084436fb'



const rights = {
  "/api/roles": [[administrator]],
  "/api/roles/create": [[administrator]],

  "/api/products/search": [[administrator],[creator],[user]],
  "/api/products/like": [[administrator],[creator],[user]],
  "/api/products/create": [[administrator],[creator]],
  "/api/products/delete": [[administrator],[creator]],
  
  
  "/api/users/search":[[administrator]],
  "/api/users/create":[[administrator]],

  "/api/categories/search":[[administrator],[creator],[user]],
  "/api/categories/create":[[administrator],[creator]],

  "/api/token/refresh_token":[[administrator],[creator],[user]],
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
      res.status(401);
      res.end();
    }
    else{
      var roles_decoded = JSON.stringify(decoded.role)
      
      var right_control = new Promise(function(resolve,reject){
        //On parse pour eviter une erreur suite a l'ajout de fonction via le ?
        parsed_url = req.originalUrl.split('?')

        console.log('[!]debug', parsed_url[0])
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
router.use("/api/products/search", check_user, products)
router.use("/api/products/delete", check_user, products)
router.use("/api/products", products)

const categorie = require("./categories")
router.use("/api/categories/create", check_user, categorie)
router.use("/api/categories/search", check_user, categorie)
router.use("/api/categories", categorie)

const users = require("./users")
router.use("/api/users/create", check_user, users)
router.use('/api/users/search',check_user, users)
router.use("/api/users/login", users)
router.use("/api/users", users)

const role = require("./roles")
router.use("/api/roles/create", check_user, role)
router.use("/api/roles/search", check_user, role)
router.use("/api/roles", role)

const token = require("./token")
router.use("/api/token",check_user, token)

module.exports = router;
