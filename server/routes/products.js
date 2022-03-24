const router = require("express").Router();
const mongoose = require("mongoose");

var Schema = mongoose.Schema;

const categoriesSchema = new Schema({
  name : { type : String, unique: true, required : [true, 'Un produit à besoin d\'un nom'] },
  description : { type : String, required : [true, 'Un produit à besoin d\'une description'] },
})

var categories = mongoose.model('categories', categoriesSchema );
var awesome_instance = new categories ({ name: 'electromenager', description: 'machine à laver, lave vaiselle etc...'});
//awesome_instance.save();
var awesome_instance = new categories ({ name: 'meuble', description: 'commode, étagere etc...'});
//awesome_instance.save();
var awesome_instance = new categories ({ name: 'outils de soin', description: 'rasoir, creme, gel douche etc...'});
//awesome_instance.save();
var awesome_instance = new categories ({ name: 'haute technologie', description: 'smartphone, tablette etc....'});
//awesome_instance.save();

const ProductsSchema = new Schema({
  name : { type : String, required : [true, 'Un produit à besoin d\'un nom']},
  description : { type : String, required : [true, 'Un produit à besoin d\'une description']},
  price : { type : Number, required : [true, 'Un produit à besoin d\'un prix']}, 
  categories : [{ type: Schema.Types.ObjectId, ref: 'categories', required : [true, 'Ceci n\'est pas une categorie valide']}],
  images : { type : [String]},
  createdAt : {
    type: Date,
    default: () => Date.now(),
  },
});

const Products = mongoose.model('Products', ProductsSchema );

router.get("/", (req, res) => {
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
    /*
    const create_product = new Products ({ 
      name: 'KESSER® Table de Buffet Table Pliante en Plastique 183x76 cm Table de Camping Table de fête Table Pliante', 
      description: 'Grâce à sa poignée de transport, à son faible poids ainsi qu à la fonction pliante, la table est facile à transporter et se range dans tous les coffres de voiture.', 
      price: '84.70', 
      categories: ['62350bb28a904301b1d1eee3'],
    });
    await create_product.save().then(() => console.log("user saved"));
    */
    const product = await Products.find().sort({ _id: -1 }).limit(100).populate("categories")
    res.json(product)
    res.end()
    }
});


module.exports = router;
