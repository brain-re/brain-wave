const router = require("express").Router();
const roles = require("../../../models/roles.model")


router.get("/", (req, res) => {
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

module.exports = router;
