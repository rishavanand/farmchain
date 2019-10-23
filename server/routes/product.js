var express = require('express');
var router = express.Router();
var controllers = require('../controllers');
var middleware = require('../middleware');

/* Route to fetch products */
router.get('/', middleware.authorize.all, controllers.product.fetch.all);

/* Route to fetch product photo */
router.get('/:productId/photo', middleware.authorize.all, controllers.product.fetch.photo);

module.exports = router;