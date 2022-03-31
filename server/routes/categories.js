const router = require("express").Router();
const mongoose = require("mongoose");
const categories = require("../models/categories.model");


router.get("/", (req, res) => {
    run_list_categories();
    async function run_list_categories(){
    const categories_display = await categories.find().sort({ _id: -1 }).limit(100)
    res.json(categories_display)
    res.end()
    }
});

router.post("/create", (req, res) => {
    const create_categories = new categories ({
      name: req.body['name'],
      description: req.body['description'],
      });
      create_categories.save().then(() => console.log("categories created"));
    res.end()
  });


module.exports = router;
