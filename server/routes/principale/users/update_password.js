const router = require("express").Router();
const users = require("../../../models/users.model")
const bcrypt = require('bcrypt');
var funct_decode_bearer = require('../../utility function/decode_jwt').decode_bearer;

router.post('/',async (req,res) => {
    //decodeJWT
    jwt_decoded = funct_decode_bearer(req)
    //get passwd in mongo bdd for compare with the value "current passwd"
    const user = await users.findById(jwt_decoded.user);
    const isMatch = await bcrypt.compare(req.body['current_password'].trim(), user.password)
    if (!isMatch) return res.status(400).json({ msg: 'Current password is incorrect' });
  
    //replace the current password with the new passwd
    user.password = req.body['new_password'].trim();
    await user.save();
  
    res.json({ msg: 'Password updated successfully' });
  })


module.exports = router;