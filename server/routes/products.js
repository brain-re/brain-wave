const router = require("express").Router();
const mongoose = require("mongoose");
const Products = require("../models/products.model");
const categories = require("../models/categories.model");
const jwt = require('jsonwebtoken');

router.get("/search", (req, res) => {
  if (req.query.search === undefined) {
    run_100_last()
  } else {
    run_search()
  }

  async function run_search(){
    search_product = req.query.search
    //The part below permit to insensitive the query
    const regex = new RegExp(search_product, 'i')
    const product = await Products.find({ $or: [{ name : {$regex: regex}},{ description : {$regex: regex}} ]}).populate("categories")
    res.json(product)
    res.end()
  }

  async function run_100_last(){
    const product = await Products.find().sort({ _id: -1 }).limit(100).populate("categories")
    res.json(product)
    res.end()
  }
});

router.get("/delete", (req, res) => {
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
      const check_user0 = Products.find({creator: id_decoded, _id: req.query.delete })
      resolve(check_user0)
    })
    p1.then((test) => {
      console.log(test[0]) 
      if(!test[0]){
        res.json("[+] Droit invalides ou produit déja supprimé")
      }
      else{
        console.log("Suppression du produit en cours")
        var p2 = new Promise(function(resolve,reject){
          const deleted_products = Products.deleteOne({creator: id_decoded, _id: req.query.delete })
          resolve(deleted_products)
        })
        p2.then((test) => {
          res.json(test)
        })
      }
    })
  }
  })
});

router.post("/create", (req, res) => {
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
  }
  else {
    var id_decoded = JSON.stringify(decoded.user)
    console.log("[+] Session utilisateur", id_decoded)
    id_decoded = id_decoded.replace(/['"]+/g, "");
    
    //Dans ce bloc de code on crée le produit
    const create_products = new Products ({
      name: req.body['name'],
      description: req.body['description'],
      price: req.body['price'],
      categories: req.body['categories'],
      //[!] Voir pourquoi creator est un putain de tableau
      //[!] Ensiger d'utiliser l'ID de l'utilisateur plutot que son mail
      creator: id_decoded.toString(),
      images: req.body['images'],
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
