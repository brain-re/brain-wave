const router = require("express").Router();
const users = require("../../../models/users.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function send_JWT(check_user,res){
    var token = jwt.sign({
      user: check_user.id,
      roles: check_user.roles,
      firstname: check_user.firstname,
      lastname: check_user.lastname,
      email: check_user.email,
      iat : Math.round(new Date().getTime() / 1000)
    }, process.env.access_token_secret, { expiresIn: process.env.jwt_time_expire});
    res.json({bearer: token})
    res.end()
  };

router.post("/", (req, res) => {
    async function check_user_existing(){
      const checked_users = await users.find({email:req.body.email})
      if (!checked_users[0]) {
        res.json(403, "Mot de passe ou email invalide")
        console.log("[i] No user in BDD")
      }             
      else{
        console.log("[i] User exist : ", checked_users, "ID :", checked_users[0]._id)
        console.log("[i] Checking the validity of the password")
        let bool = bcrypt.compareSync(req.body.password,checked_users[0].password)
        if (bool != true) {
          res.json(403, "Mot de passe ou email invalide")
        }
        else {
          send_JWT(checked_users[0],res);
        }
      }
    }
    check_user_existing()
  });

module.exports = router;
