const router = require("express").Router();
const product = require("./products")

router.use("/api/products", product)

module.exports = router;
