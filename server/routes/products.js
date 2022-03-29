const router = require("express").Router();
const mongoose = require("mongoose");
const Products = require("../models/products.model");
const categories = require("../models/categories.model");

router.get("/", (req, res) => {
  if (req.query.search === undefined) {
    run_100_last()
  } else {
    run_search()
  }

  async function run_search(){
    search_product = req.query.search
    //The part below permit to insensitive the query
    const regex = new RegExp(search_product, 'i')
    const product = await Products.find({ $or: [{ name : {$regex: regex}},{ description : {$regex: regex}} ]}).populate("categories")
    res.json(product)
    res.end()
  }

  async function run_100_last(){
    const product = await Products.find().sort({ _id: -1 }).limit(100).populate("categories")
    res.json(product)
    res.end()
  }
});

router.post("/create", (req, res) => {
  const products_json = JSON.parse(JSON.stringify(req.body));
  const create_product = new Products ({
    name: products_json['name'],
    description: products_json['description'],
    price: products_json['price'],
    categories: products_json['categories'],
    images: products_json['images'],
    });
    create_product.save().then(() => console.log("user created"));
  res.end()
});


module.exports = router;
