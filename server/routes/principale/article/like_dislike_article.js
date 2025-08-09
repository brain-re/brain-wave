const router = require("express").Router();
const articles = require("../../../models/article.model");
const Users = require("../../../models/users.model");
var funct_decode_bearer = require('../../utility function/decode_jwt').decode_bearer;

  
async function toggle_like_article(direction, article)
{
  const filters = {};

  if (direction == true ) {
    filters = {...filters, $set: { 
        liked: { 
          $cond: [
            { $in: [ decoded_bearer.user, "$disliked" ] }, 
            { $setDifference: [ "$disliked", [ decoded_bearer.user ] ] }, 
            { $concatArrays: [ "$disliked", [ decoded_bearer.user ] ] } 
          ] 
        },
        disliked: { $pull: { disliked: decoded_bearer.user} }
      }
    };
  } else {
    filters = {...filters, $set: {
        disliked: { 
          $cond: [ { $in: [ article, "$disliked" ] }, 
                    { $setDifference: [ "$disliked", [ article ] ] }, 
                    { $concatArrays: [ "$disliked", [ article ] ] } 
          ] 
        },
        liked: { $pull: { liked: decoded_bearer.user} }
      }
    }
  }

  const articleQ$ = articles.findOneAndUpdate(
    { _id: req.body.article_id }, 
    filters,
    {upsert: true},
  );

  return Promise.all([articleQ$]);
}

router.post("/", async (req, res) => {
    let decoded_bearer = funct_decode_bearer(req)
  
    const article = await articles.findOne({_id: req.body.article_id})

    return toggle_like_article(req.body.like, article)
          .then((values) => {
            let product = values[0];
            count_like()
            res.status(200).send(product)
            res.end()
          }).catch(err => console.log(err))
      
});

  module.exports = router;
