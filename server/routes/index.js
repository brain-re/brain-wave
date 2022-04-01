const router = require("express").Router();

const product = require("./products");
router.use("/api/products", product)

const categorie = require("./categories")
router.use("/api/categories", categorie)

const user = require("./users")
router.use("/api/users", user)

const role = require("./roles")
router.use("/api/roles", role)

module.exports = router;
