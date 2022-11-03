const config = require("../config/index");
const express = require("express");
const router = express.Router();
const { auth } = require("express-openid-connect");
const {AuthController} = require("../controllers/auth");
var path = require("path");
const opencors = require("../middleware/opencors");
const loadUser = require("../middleware/loadUser");
// router.use(express.static("static")).use(opencors);

// const configure = {
//     authRequired: false,
//     auth0Logout: true,
//     secret: config.auth0_secret,
//     baseURL: config.auth0_baseURL,
//     clientID: config.auth0_id,
//     issuerBaseURL: config.auth0_baseURL,
//   }

// auth router attaches /login, /logout, and /callback routes to the baseURL
// router.use(auth(configure));

router.use([opencors, express.json()]);
// router.use("/authorization", (res,req) => {
//     res.sendFile(path.join(__dirname, "../static/oauth.html"))});
router.use("/authorization", require("./oauth"));
router.use("/recipes", require("./recipes"));
router.use("/fromTheKitchenOf", loadUser, require("./kitchens"));
router.use("/api-docs", require("./swagger"));

module.exports = router;
