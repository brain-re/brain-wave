const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
    name : { type : String, unique: true, required : [true, 'Un produit à besoin d\'un nom'] },
    description : { type : String, required : [true, 'Un produit à besoin d\'une description'] },
})
  
/*
var awesome_instance = new categories ({ name: 'electromenager', description: 'machine à laver, lave vaiselle etc...'});
//awesome_instance.save();
var awesome_instance = new categories ({ name: 'meuble', description: 'commode, étagere etc...'});
//awesome_instance.save();
var awesome_instance = new categories ({ name: 'outils de soin', description: 'rasoir, creme, gel douche etc...'});
//awesome_instance.save();
var awesome_instance = new categories ({ name: 'haute technologie', description: 'smartphone, tablette etc....'});
//awesome_instance.save();;
*/  

const categories = mongoose.model('categories', categoriesSchema );

module.exports = categories;
