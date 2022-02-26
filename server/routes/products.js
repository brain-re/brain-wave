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

const ProductsSchema = new Schema({
  name : { type : String, required : [true, 'Un produit à besoin d\'un nom']},
  description : { type : String, required : [true, 'Un produit à besoin d\'une description']},
  price : { type : Number, required : [true, 'Un produit à besoin d\'un prix']}, 
  categories : { type: [Schema.Types.ObjectId], ref: 'categories', required : [true, 'Ceci n\'est pas une categorie valide']},
  images : { type : [String]},
});

ProductsSchema.query.byName = function(name) {
  return this.where({ "name": new RegExp(name, 'i') })
};

const Products = mongoose.model('Products', ProductsSchema );

router.get("/", (req, res) => {
  let search = req.query.search;
  Products.find().byName(search).exec((err, data) => {
      console.log(data);
      res.status(200).json(data);
      res.end()
    }
  );
});


module.exports = router;
