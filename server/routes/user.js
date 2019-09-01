var express = require('express');
var router = express.Router();
var controllers = require('../controllers');
var middleware = require('../middleware');
var multer = require('multer');

const upload = multer({
    dest: "./pics"
});

/* Router for user login */
router.post('/login', controllers.user.login);

/* Router for user registration */
router.post('/register', controllers.user.register);

/* Router for user mobile number verification */
router.post('/otp/verify', controllers.otp.verify);

/* Router for re-generating and sending OTP */
router.post('/otp/resend', controllers.otp.resend);

/* Router for updating user profile */
router.post('/update/profile', middleware.authorize.all, controllers.user.update.profile);

/* Router for deleting user */
router.post('/delete', middleware.authorize.all, controllers.user.remove);

/* Router for updating user password */
router.post('/update/password', middleware.authorize.all, controllers.user.update.password);

/* Router for fetching user profile */
router.get('/profile', middleware.authorize.all, controllers.user.fetch.profile);

/* Router for changing user profile photo */
router.post('/update/photo', upload.single("file"), middleware.authorize.all, controllers.user.update.photo);

/* Router for fetching user profile photo */
router.get('/photo', middleware.authorize.all, controllers.user.fetch.photo);

module.exports = router;