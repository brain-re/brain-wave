const dotenv = require('dotenv').config({path: __dirname + '/.env'});
const router = require("express").Router();
const { json } = require('body-parser');
const jwt = require('jsonwebtoken');


function decode_bearer(req){
    console.log(req.headers['authorization'])
    const authHeader = req.headers['authorization']
    var token = authHeader && authHeader.split(' ')[1]
    var test = jwt.verify(token, process.env.access_token_secret, (err, decoded) => {
    if (err) {
      console.log(err)
      console.log("[!] Something wrong")
    }
    else {
      return decoded
    }
    })
    return test
  }


const administrator = '62463c087ad782107e12ff7a'
const user = '6288df5bfb6f79012342f80a'
const creator = '6288dfd888de3002084436fb'

const visitor_rights = ["/api/users/login","/api/products/search","/api/categories/search","/api/categories"]

const rights = {
    "/api/roles": [[administrator]],
    "/api/roles/create": [[administrator]],
  
    "/api/products/like": [[administrator],[creator],[user]],
    "/api/products/create": [[administrator],[creator]],
    "/api/products/delete": [[administrator],[creator]],
  
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
                res.status(200).send("granted")
                var validated = 1
            }
          }
        if (validated == 0){
            check_granted_route()
        }
      }
    
    async function check_granted_route(){
        decoded_bearer = decode_bearer(req)
        console.log("test", rights[req.query.route])

        var right_control = new Promise(function(resolve,reject){
            rights[req.query.route].forEach(element => {
              if (decoded_bearer.roles[0] == element[0]){
                resolve()
              }
            })
            reject()
          })
        
        right_control.then(() => {
            res.status(200).send("granted")
          }, () => {
            res.status(401).send("unauthorized")
          })
        }
  });

module.exports = router;
