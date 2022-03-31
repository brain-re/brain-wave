const router = require("express").Router();
const product = require("./products");
const categorie = require("./categories")

router.use("/api/products", product)
router.use("/api/categories", categorie)

module.exports = router;
