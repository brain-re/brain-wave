const router = require("express").Router();
const articles = require("../../../models/article.model");

router.get("/",  (req, res) => {
  new Promise((resolve, reject) => {
    if (req.query._id != undefined) {
      articles.findById(req.query._id)
              .exec()
              .then((article) => resolve([article]))
              .catch((err) => reject(`Can't find by article id ${err}`));
    } else {
      requete = request_construct(req);
      run_search(requete, req, res)
        .then((articles) => resolve(articles))
        .catch((err) => reject(`Can't find using following criteria ${JSON.stringify(requete)}. Resulting in error ${err}`));
    }
  }).then((article) => {
    res.json(article);
    res.end();
  });
})
  
function request_construct(req){
  var requete = {};
    if (req.query.name != undefined){
      const regex = new RegExp(req.query.name, 'i')
      requete = {...requete, name: {$regex: regex}}
    }
    if (req.query.category != undefined){
      requete = {...requete, category: req.query.category }
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
  try {
    const article = await articles.find({$and: [requete]}).limit(Number(req.query.number_article)).sort().populate("category").populate("users")
    return article
  } catch (error){
    res.status(400).send("[!] Erreur cotée client");
    res.end()
  }
  
}

module.exports = router;
