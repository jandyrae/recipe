const { Router } = require("express");

const router = Router();

const AuthController = require("../controllers/auth");

router.get("/auth", AuthController.login);
router.get("/oauth-callback", AuthController.callback);


// router.use(express.static("static")).use(opencors);
module.exports = router;
