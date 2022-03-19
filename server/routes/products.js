const router = require("express").Router();
const mongoose = require("mongoose");

var Schema = mongoose.Schema;

const categoriesSchema = new Schema({
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
  categories : [{ type: Schema.Types.ObjectId, ref: 'categories', required : [true, 'Ceci n\'est pas une categorie valide']}],
  images : { type : [String]},
});

ProductsSchema.query.byName = function(name) {
  return this.where({ "name": new RegExp(name, 'i')})
};

const products = mongoose.model('Products', ProductsSchema );

router.get("/", async (req, res) => {
  let search = req.query.search;
  products.find().byName(search).populate('categories').exec(
    (err, data) => {
      res.status(200).json(data);
      res.end()
    }
  );
  // await products.find().exec(async (err, _products) => {
  //   console.log('1');
  //   const __final_products = await Promise.all(
  //     _products.map(async (product) => {
  //       console.log('2');
  //       await categories.find({'_id' : product.categories}, (err, categories) => {
  //         product.categories = [];
  //         product.categories.push(...categories)
  //       });
  //       console.log('3');
  //       return product;
  //     })
  //   );
  //   console.log(__final_products);
  //   console.log('4');
  //   res.status(200).json(__final_products);
  //   res.end()
  // });  
});


module.exports = router;