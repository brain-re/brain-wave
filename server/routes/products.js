const router = require("express").Router();
const mongoose = require("mongoose");
const Products = require("../models/products.model");
const jwt = require('jsonwebtoken');
const Users = require("../models/users.model");
const { run_search_by_id } = require("./utility function/bdd_query");


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

async function IDvalideur(test_longeur_input,res){
  console.log(test_longeur_input.length)
  if (test_longeur_input.length != 24){
    res.send(403,"[!] invalid input for a product ")
    res.end()
  }
}

router.get("/search", (req, res) => {
  requete = request_construct(req)
  run_search(requete,req,res)
})

function request_construct(req){
  var requete = {};
    if (req.query.name != undefined){
      const regex = new RegExp(req.query.name, 'i')
      requete = {...requete, name: {$regex: regex}}
    }
    if (req.query.categories != undefined){
      requete = {...requete, categories: req.query.categories }
    }
    if (req.query.entreprise != undefined){
      requete = {...requete, entreprise: req.query.entreprise }
    }
    return requete
  }

async function run_search(requete,req,res){
  var sort = {};
   if (req.query.prix == "-1" || req.query.prix == "1"){
      var sort = {...sort, price: req.query.prix}
   }
  if (req.query.like == "-1" || req.query.like == "1"){
      var sort = {...sort, count_liked: req.query.like}
   }
  if (req.query.dislike == "-1" || req.query.dislike == "1"){
      var sort = {...sort, count_disliked: req.query.dislike}
  }
  const products = await Products.find({$and: [requete]}).sort(sort).populate("categories").populate("entreprises")
  res.json(products)
  res.end()
}

router.get("/like", (req, res) => {
  decoded_bearer = decode_bearer(req)

  const product_target_query = new Promise(function(resolve,reject){
    const product = Products.find({_id: req.query.product_id})
    product.exec(function (err){
      if (err){
        reject()
      }
      resolve(product)
    });
  })

  async function count_like(){
    try{
      const count = await Products.find({_id: req.query.product_id})
      console.log(count)
      await Products.findOneAndUpdate(
        {_id: req.query.product_id},
        {$set : {count_liked: count[0].liked.length} },
        {upsert: true},
        );
      } catch (error){console.log(error)}
  }

  async function count_dislike(){
    try{
      const count = await Products.find({_id: req.query.product_id})
      console.log(count)
      await Products.findOneAndUpdate(
        {_id: req.query.product_id},
        {$set : {count_disliked: count[0].disliked.length} },
        {upsert: true},
        );
      } catch (error){console.log(error)}
  }


  async function remove_liked_product(){
    try{
    const already_liked = await Products.updateOne(
      { _id: req.query.product_id }, 
      { $pull: { liked: decoded_bearer.user} },
    );
    const user_already_liked = await Users.updateOne(
      { _id: decoded_bearer.user},
      { $pull: {product_liked: req.query.product_id}}
    );
    } catch (error){
      console.log(403,"[!] Something wrong with the id of the product disliked, the level of its error is at function liked_product")
      console.log(error)
      res.end()
    }
    count_like()
    console.log("[i] The entry for the like of user is removed")
  }

  async function remove_disliked_product(){
    try{
    const already_disliked = await Products.updateOne(
      { _id: req.query.product_id }, 
      { $pull: { disliked: decoded_bearer.user} },
    );
    const user_already_disliked = await Users.updateOne(
      { _id: decoded_bearer.user},
      { $pull: {product_disliked: req.query.product_id}}
    );
    } catch (error){
      console.log(403,"[!] Something wrong with the id of the product disliked, the level of its error is at function liked_product")
      console.log(error)
      res.end()
    }
    count_dislike()
    console.log("[i] The entry for the dislike of user and the product is removed")
  }


  //Like condition
  if (req.query.like === "1"){
    product_target_query.then((product) => {
      if (product[0] == product[1]){
        console.log("Le produit n'existe pas")
        res.status(401).send("[!] Something wrong with the id of the product liked, the product does not exist in the BD")
      }
      else {
        for (var i = 0; i < product[0].liked.length; i++) {
          if (product[0].liked[i] == decoded_bearer.user){
            console.log("[i] le client à déja renseigné qu'il aimait ce produit", product[0].liked[i], decoded_bearer.user)
            var liked = "already liked"
            break;
          }
        }
        for (var i = 0; i < product[0].disliked.length; i++) {
          if (product[0].disliked[i] == decoded_bearer.user){
            console.log("[i] le client à déja renseigné qu'il n'aimait pas ce produit", product[0].disliked[i], decoded_bearer.user)
            var disliked = "already disliked"
            break;
          }
        }

        if (liked === "already liked"){
          remove_liked_product()
          res.status(200).send("[+] The product is no longer liked")
          res.end()
        }
        else if (disliked === "already disliked"){
          console.log("[i] already disliked")
          remove_disliked_product()
          liked_product()
        }
        else{
          liked_product()
        }

      }
    }, () => {
      res.status(403).send("[!] Something wrong with the id of the product liked, the ID is not valid")
    })

    async function liked_product(){
      try{
      const liked = await Products.findOneAndUpdate(
        { _id: req.query.product_id }, 
        { $push: { liked: decoded_bearer.user} },
      );
      const user_liked = await Users.findOneAndUpdate(
        { _id: decoded_bearer.user},
        { $push: {product_liked: req.query.product_id}}
      );
      } catch (error){
        console.log(403,"[!] Something wrong with the id of the product liked, the level of its error is at function liked_product")
        console.log(error)
        res.end()
      }
      count_like()
      res.status(200).send("[+] The product is succefully liked")
      res.end()
    }
  }
  //dislike condition
  else if (req.query.like === "0"){
    product_target_query.then((product) => {
      if (product[0] == product[1]){
        console.log("Le produit n'existe pas")
        res.status(401).send("[!] Something wrong with the id of the product liked, the product does not exist in the BD")
      }
      else {
        for (var i = 0; i < product[0].disliked.length; i++) {
          if (product[0].disliked[i] == decoded_bearer.user){
            console.log("[i] le client à déja renseigné qu'il n'aimait pas ce produit", product[0].disliked[i], decoded_bearer.user)
            var disliked = "already disliked"
            break;
          }
        }
        for (var i = 0; i < product[0].liked.length; i++) {
          if (product[0].liked[i] == decoded_bearer.user){
            console.log("[i] le client à déja renseigné qu'il aimait ce produit", product[0].disliked[i], decoded_bearer.user)
            var liked = "already liked"
            break;
          }
        }

        if (disliked === "already disliked"){
          remove_disliked_product()
          res.status(401).send("[+] The product is no longer disliked")
          res.end()
        }
        else if (liked === "already liked"){
          console.log("[i] already liked")
          remove_liked_product()
          disliked_product()
        }
        else{
          disliked_product()
        } 
      }

      async function disliked_product(){
        try{
        const disliked = await Products.findOneAndUpdate(
          { _id: req.query.product_id }, 
          { $push: { disliked: decoded_bearer.user} },
        );
        const user_disliked = await Users.findOneAndUpdate(
          { _id: decoded_bearer.user},
          { $push: {product_disliked: req.query.product_id}}
        );
        } catch (error){
          console.log(403,"[!] Something wrong with the id of the product disliked, the level of its error is at function liked_product")
          console.log(error)
          res.end()
        }
        count_dislike()
        res.status(200).send("[+] The product is succefully disliked")
        res.end()
      }

    }, () => {
      res.status(403).send("[!] Something wrong with the id of the product liked, the ID is not valid")
    })
  }
  else{
    //Besoin de traiter obligatoirement la fonction promise sinon erreur.
    product_target_query.then(() => {
    }, () => {})
    res.status(403).send("[!]Valeur d'input like invalide, attendu booleen")
    res.end()
  }
})


router.get("/delete", (req, res) => {
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
      var check_user0 = Products.find({creator: id_decoded, _id: req.query.delete })
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
          const deleted_products = Products.deleteOne({creator: id_decoded, _id: req.query.delete })
          deleted_products.exec(function (err) {
            if (err) {
                return;
            }
            resolve(deleted_products)
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
