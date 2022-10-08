const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const saltRounds = 10;

const userSchema = mongoose.Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: [{ type: Schema.Types.ObjectId, ref: 'roles', required : [true, 'Ceci n\'est pas un role valide']}],
  product_liked: [{ type: Schema.Types.ObjectId, ref: 'products'}],
  product_disliked: [{ type: Schema.Types.ObjectId, ref: 'products'}],
  blocked: Boolean
});

userSchema.pre('save', async function(next) {
  let crypt = new Promise((resolve, reject) => {
    bcrypt.hash(this.password, saltRounds)
          .then((hash) => resolve(hash));
  });

  await crypt.then(sha => {
    this.password = sha
  });

  next();
});

const Users = mongoose.model('User', userSchema);

module.exports = Users;