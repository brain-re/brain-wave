const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductsSchema = new Schema({
    name : { type : String, unique: true, required : [true, 'Un produit à besoin d\'un nom']},
    description : { type : String, required : [true, 'Un produit à besoin d\'une description']},
    price : { type : Number, required : [true, 'Un produit à besoin d\'un prix']}, 
    categories : [{ type: Schema.Types.ObjectId, ref: 'categories', required : [true, 'Ceci n\'est pas une categorie valide']}],
    images : [{type : String}],
    createdAt : {type: Date, default: () => Date.now()},
    creator : { type: Schema.Types.ObjectId, ref: 'users', required : [true, 'Ceci n\'est pas un utilisateur valide']},
    liked : [{ type: Schema.Types.ObjectId, ref: 'users'}],
    count_liked : { type: Number},
    disliked : [{ type: Schema.Types.ObjectId, ref: 'users'}],
    count_disliked : { type: Number},
    entreprise : [{ type : Schema.Types.ObjectId, ref: 'entreprises'}]
  });

const Products = mongoose.model('Products', ProductsSchema );

module.exports = Products;

