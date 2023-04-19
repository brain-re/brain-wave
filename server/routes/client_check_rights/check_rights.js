const dotenv = require('dotenv').config({path: __dirname + '/.env'});
const router = require("express").Router();
const jwt = require('jsonwebtoken');
var funct_decode_bearer = require('../utility function/decode_jwt.js').decode_bearer;

const administrator = '62463c087ad782107e12ff7a'
const user = '6288df5bfb6f79012342f80a'
const creator = '6288dfd888de3002084436fb'

const visitor_rights = ["/api/users/login","/api/article/search","/api/categories/search","/api/categories"]

const rights = {
    "/api/roles": [[administrator]],
    "/api/roles/create": [[administrator]],
  
    "/api/article/like": [[administrator],[creator],[user]],
    "/api/article/create": [[administrator],[creator]],
    "/api/article/delete": [[administrator],[creator]],
  
    "/api/users/search":[[administrator]],
    "/api/users/create":[[administrator]],
  
    "/api/categories/create":[[administrator],[creator]],
  
    "/api/token/refresh_token":[[administrator],[creator],[user]],
  }

router.get("/", (req, res) => {
    if (req.query.route === undefined) {
        res.status(403).send("[!] Something Wrong with the route send")
      } else {
        var validated = 0
        for (var i = 0; i < visitor_rights.length; i++) {
            if (visitor_rights[i] == req.query.route){
                res.status(200).send("true")
                var validated = 1
            }
          }
        if (validated == 0){
            check_granted_route()
        }
      }
    
    async function check_granted_route(){
        jwt_decoded = funct_decode_bearer(req)
        var right_control = new Promise(function(resolve,reject){
            rights[req.query.route].forEach(element => {
              if (jwt_decoded.roles[0] == element[0]){
                resolve()
              }
            })
            reject()
          })
        
        right_control.then(() => {
              res.status(200).send("true")
          }, () => {
            res.status(401).send("false")
          })
        }
  });

module.exports = router;
