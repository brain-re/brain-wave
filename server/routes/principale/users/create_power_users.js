const router = require("express").Router();
const users = require("../../../models/users.model")

router.post("/", (req, res) => {
    const create_users = new users ({
      firstname: req.body['firstname'].trim(),
      lastname: req.body['lastname'].trim(),
      email: req.body['email'].trim(),
      roles: req.body['role'].trim(),
      password: req.body['password'].trim(),
    });
  
    create_users.save(function(err){
      if (err) {
        console.log(err);
        res.send(400, 'Bad Request or user already exist')
        res.end()
      }
      else{
        res.json("[+] User created")
        res.end()
      }
    });
  });

module.exports = router;
