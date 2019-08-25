var express = require('express');
var router = express.Router();
var controllers = require('../controllers');
var middleware = require('../middleware');
var multer = require('multer');

const upload = multer({
    dest: "../user_pics"
});

router.post('/login', controllers.user.login);
router.post('/register', controllers.user.register);
router.post('/otp/verify', controllers.otp.verify);
router.post('/otp/resend', controllers.otp.resend);
router.post('/update/profile', middleware.authorize.all, controllers.user.update.profile);
router.post('/update/password', middleware.authorize.all, controllers.user.update.password);
router.get('/profile', middleware.authorize.all, controllers.user.fetch.profile);
router.post('/update/photo', upload.single("file"), middleware.authorize.all, controllers.user.update.photo);
router.get('/photo', middleware.authorize.all, controllers.user.fetch.photo);

module.exports = router;