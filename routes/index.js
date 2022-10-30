
const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/auth");
const opencors = require("../middleware/opencors");

router.use([opencors, express.json()]);
router.use("/", AuthController.load);
router.use("/recipes", require("./recipes"));
router.use("/fromTheKitchenOf", require("./kitchens"));
router.use("/api-docs", require("./swagger"));

module.exports = router;
