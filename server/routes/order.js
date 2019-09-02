var express = require('express');
var router = express.Router();
var controllers = require('../controllers');
var middleware = require('../middleware');

/* Route to buy crop */
router.post('/', middleware.authorize.all, middleware.authorize.wholesaler, controllers.order.buy.crop);

module.exports = router;