const router = require("express").Router();
const categories = require("../../../models/categories.model");

router.post("/", (req, res) => {
    const create_categories = new categories ({
      name: req.body['name'],
      description: req.body['description'],
      });
      create_categories.save(function(err){
        if (err) {
          console.log(err);
          res.send(400, 'Bad Request or categories already exist')
          res.end()
        }
        else{
          res.json("[+]categories created")
          res.end()
        }
      })
});


module.exports = router;