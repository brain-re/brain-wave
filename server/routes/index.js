const router = require("express").Router();

const sample = require("./sample");
const product = require("./products")

router.use("/api/sample", sample);
router.use("/api/products", product)

module.exports = router;
