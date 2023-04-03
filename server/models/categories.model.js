const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
    name : { type : String, unique: true, required : [true, 'Une categorie à besoin d\'un nom'] },
    description : { type : String, required : [true, 'Une categorie à besoin d\'une description'] },
})
const category = mongoose.model('category', categoriesSchema );

module.exports = category;

