const router = require("express").Router();
const mongoose = require("mongoose");
const roles = require("../models/roles.model")

router.get("/search", (req, res) => {
    if (req.query.search === undefined) {
      run_100_last()
    } else {
      run_search()
    }
  
    async function run_search(){
      search_roles = req.query.search
      //The part below permit to insensitive the query
      const regex = new RegExp(search_roles, 'i')
      const role = await roles.find({ $or: [{ role_name : {$regex: regex}},{ description : {$regex: regex}} ]})
      res.json(role)
      res.end()
    }
  
    async function run_100_last(){
      const role = await roles.find().sort({ _id: -1 })
      res.json(role)
      res.end()
    }
  });
  
router.post("/create", (req, res) => {
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
