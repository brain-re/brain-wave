const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const entreprisesSchema = new Schema({
    name : { type : String, unique: true, required : [true, 'Une entreprise à besoin d\'un nom'] },
    description : { type : String, required : [true, 'Une entreprise à besoin d\'une description'] },
    url : { type : String },
    adresse : { type : String},
    proprietaire : { type : String},
    numeros : { type : String},
    commentaire : { type : String},
    products : [{ type: [Schema.Types.ObjectId], ref: 'products'}],
})
const entreprise = mongoose.model('entreprises', entreprisesSchema );

module.exports = entreprise;

