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
  "/api/roles/create": [[role_administrator]],
  "/api/roles/search": [[role_administrator],[role_creator]],

  "/api/article/like": [[role_administrator],[role_creator],[role_user]],
  "/api/article/create": [[role_administrator],[role_creator]],
  "/api/article/delete": [[role_administrator],[role_creator]],

  "/api/users/search":[[role_administrator]],
  "/api/users/create_power_users":[[role_administrator]],
  "/api/users/update_password":[[role_administrator],[role_creator],[role_user]],

  "/api/categories/create":[[role_administrator]],

  "/api/token/refresh_token":[[role_administrator],[role_creator],[role_user]],

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

//article route
const create_article = require('./principale/article/create_article')
router.use('/api/article/create', check_user, create_article)

const like_article = require('./principale/article/like_dislike_article')
router.use('/api/article/like', check_user, like_article)

const search_article = require('./principale/article/search_article')
router.use('/api/article/search', search_article)

const delete_article = require('./principale/article/detete_article')
router.use('/api/article/delete', check_user, delete_article)

//Categories route-----------------------------------------------------------------------------------------------------------
const create_categories = require('./principale/categories/create_categories')
router.use('/api/categories/create', check_user, create_categories)
const search_categories = require('./principale/categories/search_categories')
router.use('/api/categories/search', search_categories)


//Users route-----------------------------------------------------------------------------------------------------------
const create_users = require('./principale/users/create_users')
router.use('/api/users/create_users', create_users)
const login_users = require('./principale/users/login')
router.use('/api/users/login', login_users)
const create_power_users = require('./principale/users/create_power_users')
router.use('/api/users/create_power_users', check_user, create_power_users)
const search_users = require('./principale/users/search_users')
router.use('/api/users/search', check_user, search_users)
const update_password = require('./principale/users/update_password')
router.use('/api/users/update_password', check_user, update_password)


//Roles route-----------------------------------------------------------------------------------------------------------
const search_roles = require('./principale/roles/search_roles')
router.use('/api/roles/search',check_user, search_roles)
const create_roles = require('./principale/roles/create_roles')
router.use('/api/roles/create',check_user, create_roles)

// route-----------------------------------------------------------------------------------------------------------
const refresh_token = require("./principale/token/token")
router.use("/api/token/refresh_token",check_user, refresh_token)

const global_rights = require('./client_check_rights/check_rights.js')
router.use("/api/is_granted", global_rights)

const specific_rights = require('./client_check_rights/specific_rights.js')
router.use("/api/specific_granted/delete", specific_rights)

module.exports = router;
