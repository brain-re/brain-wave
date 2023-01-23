const router = require("express").Router();
const Products = require("../../../models/products.model");
const jwt = require('jsonwebtoken');

router.post("/", (req, res) => {
    //By default array have a default value of empty array so they bypass the required in shema. So i need to implecity set "undefined" to array categorie
    if (req.body.categories == undefined) {
      res.send(400, '[!] all information are not send correctly to the server for the creation of a product, this is a problem with categories')
      res.end()
    } else {
      //Dans le bloc de code du dessous on récupérer l'user qui crée le produit
      const authHeader = req.headers['authorization']
      var token = authHeader && authHeader.split(' ')[1]
      jwt.verify(token, process.env.access_token_secret, (err, decoded) => {
      if (err) {
        console.log("[!] Something wrong")
        res.end()
      }
      else {
        var id_decoded = JSON.stringify(decoded.user)
        console.log("[+] Session utilisateur", id_decoded)
        id_decoded = id_decoded.replace(/['"]+/g, "");
        
        //Dans ce bloc de code on crée le produit
        const create_products = new Products ({
          name: req.body['name'].trim(),
          description: req.body['description'].trim(),
          price: req.body['price'].trim(),
          categories: req.body['categories'].trim(),
          creator: id_decoded.toString().trim(),
          images: req.body['images'].trim(),
          });
          create_products.save(function(err){
            if (err) {
              res.send(400, '[!] all information are not send correctly to the server for the creation of a product, or this name already exist')
              res.end()
            }
            else{
              res.json("[+] Products created")
              res.end()
            }
          })
      }
      })
    }
    });
    
    module.exports = router;