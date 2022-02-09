const router = require("express").Router();

const sample = require("./sample");

router.use("/api/sample", sample);
router.use("/api/sample", sample);

module.exports = router;
