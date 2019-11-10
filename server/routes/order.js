var express = require('express');
var router = express.Router();
var controllers = require('../controllers');
var middleware = require('../middleware');

/* Route to place order */
router.post('/', middleware.authorize.all, controllers.order.buy);

/* Route to fetch orders */
router.get('/', middleware.authorize.all, controllers.order.fetch.list);

/* Route to approve orders */
router.post('/approve', middleware.authorize.all, controllers.order.approve);

/* Route to add review */
router.post('/review', middleware.authorize.all, controllers.order.review.add);

module.exports = router;