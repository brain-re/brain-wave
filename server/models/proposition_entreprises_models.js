const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const proposition_entreprisesSchema = new Schema({
    name : { type : String, unique: true, required : [true, 'Une entreprise à besoin d\'un nom'] },
    description : { type : String, required : [true, 'Une entreprise à besoin d\'une description'] },
    url : { type : String },
    adresse : { type : String},
    proprietaire : { type : String},
    numeros : { type : String},
    commentaire : { type : String},
    validate_by_admin : { type : String }
})
const proposition_entreprises = mongoose.model('proposition_entreprises', proposition_entreprisesSchema );

module.exports = proposition_entreprises;
