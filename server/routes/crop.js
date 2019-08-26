var express = require('express');
var router = express.Router();
var controllers = require('../controllers');
var middleware = require('../middleware');
var multer = require('multer');

const upload = multer({
    dest: "./pics"
});

/* Route to create new crop */
router.post('/', middleware.authorize.all, middleware.authorize.farmer, controllers.crop.create);

/* Route to get all crop details of a user */
router.get('/', middleware.authorize.all, middleware.authorize.farmer, controllers.crop.fetch.details);

/* Route to get specific crop of a user */
router.get('/:cropId', middleware.authorize.all, middleware.authorize.farmer, controllers.crop.fetch.details);

/* Route to get crop photo */
router.get('/:cropId/photo', middleware.authorize.all, middleware.authorize.farmer, controllers.crop.fetch.photo);

/* Route to update crop photo */
router.post('/:cropId/update/photo', upload.single("file"), middleware.authorize.all, middleware.authorize.farmer, controllers.crop.update.photo);

/* Route to update crop details */
router.post('/:cropId/update/details', middleware.authorize.all, middleware.authorize.farmer, controllers.crop.update.details);

module.exports = router;