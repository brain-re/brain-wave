const users = require("../../models/users.model")
const mongoose = require("mongoose");
const Products = require("../../models/products.model");


exports.run_search_by_id = async function run_search_by_id(identifiant){
    const user = await users.find({ _id : { $eq: identifiant}})
    return user
  }

exports.run_search_by_propriety = async function run_search_by_propriety(identifiant){
    const product_propriety = await Products.find({creator: identifiant})
    return product_propriety
  }