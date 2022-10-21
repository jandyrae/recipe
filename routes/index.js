const express = require("express");
const router = express();
const opencors = require('../middleware/opencors');

router.use(opencors);
router.use("/recipes", require("./recipes"));
router.use("/fromTheKitchenOf", require("./kitchens"))
router.use("/api-docs", require("./swagger"));

module.exports = router;
