const router = require("express").Router();
const articles = require("../../../models/article.model");
const Users = require("../../../models/users.model");
var funct_decode_bearer = require('../../utility function/decode_jwt').decode_bearer;


router.get("/", (req, res) => {
    decoded_bearer = funct_decode_bearer(req)
  
    const article_target_query = new Promise(function(resolve,reject){
      const article = articles.find({_id: req.query.article_id})
      article.exec(function (err){
        if (err){
          reject()
        }
        resolve(article)
      });
    })
  
    async function count_like(){
      try{
        const count = await articles.find({_id: req.query.article_id})
        console.log(count)
        await articles.findOneAndUpdate(
          {_id: req.query.article_id},
          {$set : {count_liked: count[0].liked.length} },
          {upsert: true},
          );
        } catch (error){console.log(error)}
    }
  
    async function count_dislike(){
      try{
        const count = await articles.find({_id: req.query.article_id})
        console.log(count)
        await articles.findOneAndUpdate(
          {_id: req.query.article_id},
          {$set : {count_disliked: count[0].disliked.length} },
          {upsert: true},
          );
        } catch (error){console.log(error)}
    }
  
  
    async function remove_liked_article(){
      try{
      const already_liked = await articles.updateOne(
        { _id: req.query.article_id }, 
        { $pull: { liked: decoded_bearer.user} },
      );
      const user_already_liked = await Users.updateOne(
        { _id: decoded_bearer.user},
        { $pull: {article_liked: req.query.article_id}}
      );
      } catch (error){
        console.log(403,"[!] Something wrong with the id of the article disliked, the level of its error is at function liked_article")
        console.log(error)
        res.end()
      }
      count_like()
      console.log("[i] The entry for the like of user is removed")
    }
  
    async function remove_disliked_article(){
      try{
      const already_disliked = await articles.updateOne(
        { _id: req.query.article_id }, 
        { $pull: { disliked: decoded_bearer.user} },
      );
      const user_already_disliked = await Users.updateOne(
        { _id: decoded_bearer.user},
        { $pull: {article_disliked: req.query.article_id}}
      );
      } catch (error){
        console.log(403,"[!] Something wrong with the id of the article disliked, the level of its error is at function liked_article")
        console.log(error)
        res.end()
      }
      count_dislike()
      console.log("[i] The entry for the dislike of user and the article is removed")
    }
  
  
    //Like condition
    if (req.query.like === "1"){
      article_target_query.then((article) => {
        if (article[0] == article[1]){
          console.log("Le produit n'existe pas")
          res.status(401).send("[!] Something wrong with the id of the article liked, the article does not exist in the BD")
        }
        else {
          for (var i = 0; i < article[0].liked.length; i++) {
            if (article[0].liked[i] == decoded_bearer.user){
              console.log("[i] le client à déja renseigné qu'il aimait ce produit", article[0].liked[i], decoded_bearer.user)
              var liked = "already liked"
              break;
            }
          }
          for (var i = 0; i < article[0].disliked.length; i++) {
            if (article[0].disliked[i] == decoded_bearer.user){
              console.log("[i] le client à déja renseigné qu'il n'aimait pas ce produit", article[0].disliked[i], decoded_bearer.user)
              var disliked = "already disliked"
              break;
            }
          }
  
          if (liked === "already liked"){
            remove_liked_article()
            res.status(200).send("[+] The article is no longer liked")
            res.end()
          }
          else if (disliked === "already disliked"){
            console.log("[i] already disliked")
            remove_disliked_article()
            liked_article()
          }
          else{
            liked_article()
          }
  
        }
      }, () => {
        res.status(403).send("[!] Something wrong with the id of the article liked, the ID is not valid")
      })
  
      async function liked_article(){
        try{
        const liked = await articles.findOneAndUpdate(
          { _id: req.query.article_id }, 
          { $push: { liked: decoded_bearer.user} },
        );
        const user_liked = await Users.findOneAndUpdate(
          { _id: decoded_bearer.user},
          { $push: {article_liked: req.query.article_id}}
        );
        } catch (error){
          console.log(403,"[!] Something wrong with the id of the article liked, the level of its error is at function liked_article")
          console.log(error)
          res.end()
        }
        count_like()
        res.status(200).send("[+] The article is succefully liked")
        res.end()
      }
    }
    //dislike condition
    else if (req.query.like === "0"){
      article_target_query.then((article) => {
        if (article[0] == article[1]){
          console.log("Le produit n'existe pas")
          res.status(401).send("[!] Something wrong with the id of the article liked, the article does not exist in the BD")
        }
        else {
          for (var i = 0; i < article[0].disliked.length; i++) {
            if (article[0].disliked[i] == decoded_bearer.user){
              console.log("[i] le client à déja renseigné qu'il n'aimait pas ce produit", article[0].disliked[i], decoded_bearer.user)
              var disliked = "already disliked"
              break;
            }
          }
          for (var i = 0; i < article[0].liked.length; i++) {
            if (article[0].liked[i] == decoded_bearer.user){
              console.log("[i] le client à déja renseigné qu'il aimait ce produit", article[0].disliked[i], decoded_bearer.user)
              var liked = "already liked"
              break;
            }
          }
  
          if (disliked === "already disliked"){
            remove_disliked_article()
            res.status(401).send("[+] The article is no longer disliked")
            res.end()
          }
          else if (liked === "already liked"){
            console.log("[i] already liked")
            remove_liked_article()
            disliked_article()
          }
          else{
            disliked_article()
          } 
        }
  
        async function disliked_article(){
          try{
          const disliked = await articles.findOneAndUpdate(
            { _id: req.query.article_id }, 
            { $push: { disliked: decoded_bearer.user} },
          );
          const user_disliked = await Users.findOneAndUpdate(
            { _id: decoded_bearer.user},
            { $push: {article_disliked: req.query.article_id}}
          );
          } catch (error){
            console.log(403,"[!] Something wrong with the id of the article disliked, the level of its error is at function liked_article")
            console.log(error)
            res.end()
          }
          count_dislike()
          res.status(200).send("[+] The article is succefully disliked")
          res.end()
        }
  
      }, () => {
        res.status(403).send("[!] Something wrong with the id of the article liked, the ID is not valid")
      })
    }
    else{
      //Besoin de traiter obligatoirement la fonction promise sinon erreur.
      article_target_query.then(() => {
      }, () => {})
      res.status(403).send("[!]Valeur d'input like invalide, attendu booleen")
      res.end()
    }
  })

  module.exports = router;
