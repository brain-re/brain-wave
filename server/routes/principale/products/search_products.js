const router = require("express").Router();
const Products = require("../../../models/products.model");

router.get("/",  (req, res) => {
  new Promise((resolve, reject) => {
    if (req.query._id != undefined) {
      Products.findById(req.query._id)
              .exec()
              .then((product) => resolve([product]))
              .catch((err) => reject(`Can't find by product id ${err}`));
    } else {
      requete = request_construct(req);
      run_search(requete, req, res)
        .then((products) => resolve(products))
        .catch((err) => reject(`Can't find using following criteria ${JSON.stringify(requete)}. Resulting in error ${err}`));
    }
  }).then((products) => {
    res.json(products);
    res.end();
  });
})
  
function request_construct(req){
  var requete = {};
    if (req.query.name != undefined){
      const regex = new RegExp(req.query.name, 'i')
      requete = {...requete, name: {$regex: regex}}
    }
    if (req.query.categories != undefined){
      requete = {...requete, category: req.query.categories }
    }
    if (req.query.entreprise != undefined){
      requete = {...requete, entreprise: req.query.entreprise }
    }
    return requete
}
  
function run_search(requete,req){
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
  return Products.find({$and: [requete]}).limit(Number(req.query.number_product)).sort().populate("categories").populate("entreprises")
}

module.exports = router;
