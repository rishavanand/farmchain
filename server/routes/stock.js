var express = require('express');
var router = express.Router();
var controllers = require('../controllers');
var middleware = require('../middleware');

/* Route to create new stock */
//router.post('/', middleware.authorize.all, controllers.stock.fetchAllUserStock);

/* Route to get all user stock */
router.get('/', middleware.authorize.all, controllers.stock.fetchAllUserStock);

/* Route to trackback */
router.get('/trackback/:stockId', middleware.authorize.all, controllers.stock.trackback);

module.exports = router;