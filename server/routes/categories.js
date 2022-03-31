const router = require("express").Router();
const mongoose = require("mongoose");
const categories = require("../models/categories.model");


router.get("/", (req, res) => {
  if (req.query.search === undefined) {
    run_list_categories()
  } else {
    run_search()
  }

  async function run_search(){
    search_categories = req.query.search
    //The part below permit to insensitive the query
    const regex = new RegExp(search_categories, 'i')
    const categorie = await categories.find({ $or: [{ name : {$regex: regex}},{ description : {$regex: regex}} ]})
    res.json(categorie)
    res.end()
  }

  async function run_list_categories(){
    const categories_display = await categories.find()
    res.json(categories_display)
    res.end();
    }
});

router.post("/create", (req, res) => {
    const create_categories = new categories ({
      name: req.body['name'],
      description: req.body['description'],
      });
      create_categories.save().then(() => console.log("categories created"));
    res.end();
});


module.exports = router;
