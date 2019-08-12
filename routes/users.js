var express = require('express');
var router = express.Router();
var controllers = require('../controllers');

router.get('/login', controllers.users.login);
router.get('/register', controllers.users.register);

module.exports = router;