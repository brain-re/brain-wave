const router = require("express").Router();
const users = require("../../../models/users.model")

router.get("/", (req, res) => {
    if (req.query.search === undefined) {
      run_100_last()
    } else {
      run_search()
    }
    
    async function run_search(){
      search_users = req.query.search
      //The part below permit to insensitive the query
      const regex = new RegExp(search_users, 'i')
      const user = await users.find({ $or: [{ email : {$regex: regex}}]})
      res.json(user)
      res.end()
    }
  
    async function run_100_last(){
      const user = await users.find().sort({ _id: -1 }).limit(100).populate("role")
      res.json(user)
      res.end()
    }
  });

  module.exports = router;
