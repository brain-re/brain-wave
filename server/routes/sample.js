const router = require("express").Router();

router.get("/foo", (req, res) => {
  res.status(200).json("bar");
});

module.exports = router;
