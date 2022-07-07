var express = require('express');
var router = express.Router();
var {signUpController, loginController,reqestRefreshToken} = require('../controllers/account.controller');
const {isEmail ,checkLogin} = require('../middleware/auth');

router.post('/sign-up', isEmail, signUpController)
router.post('/dologin', checkLogin, loginController)

router.post("/refresh",reqestRefreshToken)

module.exports = router