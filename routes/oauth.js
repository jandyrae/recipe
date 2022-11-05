const { Router } = require('express');
const router = Router();
// const checkJwt = require('../middleware/jwt');
// const {requiresAuth} = require("express-openid-connect");
const AuthController = require("../controllers/auth");
const opencors = require('../middleware/opencors');

router.use([opencors]);
router.get("/login", AuthController.login);
// moves to authorize then returns
router.get("/callback", AuthController.callback);


module.exports = router;
