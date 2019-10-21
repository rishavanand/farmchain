var express = require('express');
var router = express.Router();
var controllers = require('../controllers');
var middleware = require('../middleware');

/* Route to buy crop */
router.post('/crop', middleware.authorize.all, middleware.authorize.wholesaler, controllers.order.buy.crop);

/* Route to fetch orders */
router.get('/', middleware.authorize.all, controllers.order.fetch.list);

/* Route to approve orders */
router.post('/approve', middleware.authorize.all, middleware.authorize.wholesaler, controllers.order.approve);

module.exports = router;