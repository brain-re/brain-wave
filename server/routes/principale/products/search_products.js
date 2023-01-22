const router = require("express").Router();
const Products = require("../../../models/products.model");

router.get("/", (req, res) => {
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
    const products = await Products.find({$and: [requete]}).limit(Number(req.query.number_product)).sort().populate("categories").populate("entreprises")
    res.json(products)
    res.end()
}

module.exports = router;
