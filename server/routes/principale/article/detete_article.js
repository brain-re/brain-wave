const router = require("express").Router();
const article = require("../../../models/article.model");
const jwt = require('jsonwebtoken');
var funct_decode_bearer = require('../../utility function/decode_jwt').decode_bearer;


async function IDvalideur(test_longeur_input,res){
    console.log(test_longeur_input.length)
    if (test_longeur_input.length != 24){
      res.send(403,"[!] invalid input for a article ")
      res.end()
    }
  }
  

router.get("/", (req, res) => {
    IDvalideur(req.query.delete,res)
    const authHeader = req.headers['authorization']
    var token = authHeader && authHeader.split(' ')[1]
    jwt.verify(token, process.env.access_token_secret, (err, decoded) => {
    if (err) {
      console.log("[!] Something wrong")
    }
    else {
      var id_decoded = JSON.stringify(decoded.user)
      console.log("[+] Session utilisateur", id_decoded)
      id_decoded = id_decoded.replace(/['"]+/g, '');
      var p1 = new Promise(function(resolve,reject){
        var check_user0 = article.find({creator: id_decoded, _id: req.query.delete })
        check_user0.exec(function (err) {
          if (err) {
              return;
          }
          resolve(check_user0)
          });
      })
      p1.then((test) => {
        console.log(test[0]) 
        if(!test[0]){
          res.json("[+] Droit invalides ou produit déja supprimé")
        }
        else{
          console.log("Suppression du produit en cours")
          var p2 = new Promise(function(resolve,reject){
            const deleted_article = article.deleteOne({creator: id_decoded, _id: req.query.delete })
            deleted_article.exec(function (err) {
              if (err) {
                  return;
              }
              resolve(deleted_article)
            });
          })
          p2.then((test) => {
            res.json(test)
          })
        }
      })
    }
    })
  });

  module.exports = router;
