const router = require("express").Router();
const roles = require("../../../models/roles.model")

router.post("/", (req, res) => {
    const create_roles = new roles ({
      rights: req.body['rights'].trim(),
      role_name: req.body['role_name'].trim(),
      });
      create_roles.save(function(err){
        if (err) {
          res.send(400, 'Bad Request or roles already exist')
          res.end()
        }
        else{
          res.json("[+]roles created")
          res.end()
        }
      })
});

module.exports = router;
