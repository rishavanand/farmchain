var express = require('express');
var router = express.Router();
var controllers = require('../controllers');

router.post('/login', controllers.user.login);
router.post('/register', controllers.user.register);
router.post('/otp/verify', controllers.otp.verify);
router.post('/otp/resend', controllers.otp.resend);

module.exports = router;