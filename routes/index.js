const config = require("../config/index");
const express = require("express");
const router = express.Router();
var path = require("path");
const opencors = require("../middleware/opencors");


router.use([opencors, express.json()]);
// router.use("/authorization", (res,req) => {
//     res.sendFile(path.join(__dirname, "../static/oauth.html"))});
router.use("/authorization", require("./oauth"));
router.use("/recipes", require("./recipes"));
router.use("/fromTheKitchenOf", require("./kitchens"));
router.use("/api-docs", require("./swagger"));

module.exports = router;
