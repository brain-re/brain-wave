const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: [{ type: Schema.Types.ObjectId, ref: 'roles', required : [true, 'Ceci n\'est pas un role valide']}],
  product_liked: [{ type: Schema.Types.ObjectId, ref: 'products'}],
  product_disliked: [{ type: Schema.Types.ObjectId, ref: 'products'}],
});

//userSchema.plugin(uniqueValidator);

const Users = mongoose.model('User', userSchema);

module.exports = Users;