const router = require("express").Router();

router.get("/foo", (req, res) => {
  res.status(200).json("foo");
});

module.exports = router;
