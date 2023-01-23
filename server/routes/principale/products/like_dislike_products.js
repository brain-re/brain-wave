const router = require("express").Router();
const Products = require("../../../models/products.model");
const Users = require("../../../models/users.model");
var funct_decode_bearer = require('../../utility function/decode_jwt').decode_bearer;


router.get("/", (req, res) => {
    decoded_bearer = funct_decode_bearer(req)
  
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

  module.exports = router;
