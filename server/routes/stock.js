var express = require('express');
var router = express.Router();
var controllers = require('../controllers');
var middleware = require('../middleware');

/* Route to create new stock */
//router.post('/', middleware.authorize.all, controllers.stock.fetchAllUserStock);

/* Route to get all user stock */
router.get('/', middleware.authorize.all, controllers.stock.fetchAllUserStock);

/* Route to trackback */
router.get('/:stockId/trackback', middleware.authorize.all, controllers.stock.trackback);

/* Route to stock photo */
router.get('/:stockId/photo', middleware.authorize.all, controllers.stock.fetchPhoto);

module.exports = router;