const users = require("../../models/users.model")
const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
const articles = require("../../models/article.model");


exports.run_search_by_id = async function run_search_by_id(identifiant){
    const user = await users.find({ _id : { $eq: identifiant}})
    return user
  }

exports.run_search_by_propriety = async function run_search_by_propriety(identifiant){
    const article_propriety = await articles.find({creator: identifiant})
    return article_propriety
  }