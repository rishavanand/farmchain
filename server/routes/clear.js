var express = require('express');
var router = express.Router();
var controllers = require('../controllers');
var middleware = require('../middleware');

/* FOR DEMO PURPOSES ONLY */
/* Route to reset all database except users */
router.get('/', middleware.authorize.all, controllers.clear);

module.exports = router;