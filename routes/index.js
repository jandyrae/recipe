const express = require("express");
const router = express();

router.use("/recipes", require("./recipes"));
// router.use("/api-docs", require("./swagger"));

module.exports = router;
