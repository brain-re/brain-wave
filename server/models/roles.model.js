const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const roleSchema = mongoose.Schema({
  rights: {type: String, required: true, unique: true },
  role_name: {type: String, required: true, unique: true },
});

const roles = mongoose.model('roles', roleSchema );

module.exports = roles;
