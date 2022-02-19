const router = require("express").Router();
const { ExplainVerbosity } = require("mongodb");
const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var categoriesSchema = new Schema({
  name : { type : String, unique: true, required : [true, 'Un produit à besoin d\'un nom'] },
  description : { type : String, required : [true, 'Un produit à besoin d\'une description'] },
})

var categories = mongoose.model('categories', categoriesSchema );
/*var awesome_instance = new categories ({ name: 'electromenager', description: 'machine à laver, lave vaiselle etc...'});
awesome_instance.save();
var awesome_instance = new categories ({ name: 'meuble', description: 'commode, étagere etc...'});
awesome_instance.save();
var awesome_instance = new categories ({ name: 'outils de soin', description: 'rasoir, creme, gel douche etc...'});
awesome_instance.save();
var awesome_instance = new categories ({ name: 'haute technologie', description: 'smartphone, tablette etc....'});
awesome_instance.save();
*/

var ProductsSchema = new Schema({
  name : { type : String, required : [true, 'Un produit à besoin d\'un nom']},
  description : { type : String, required : [true, 'Un produit à besoin d\'une description']},
  price : { type : Number, required : [true, 'Un produit à besoin d\'un prix']}, 
  categories : { type: [Schema.Types.ObjectId], ref: 'categories', required : [true, 'Ceci n\'est pas une categorie valide']},
  images : { type : [String]},
});

var Products = mongoose.model('Products', ProductsSchema );

router.get("/", (req, res) => {

  var awesome_instance = new Products ({ name: 'rasoir K2000', description: 'rasoir de sureté', price: '201', categories: ['62104a0bcf8e17045d4b08ea', '62104a0bcf8e17045d4b08ec']});
  awesome_instance.save();

  res.end()
});

module.exports = router;
