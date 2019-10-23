var express = require('express');
var router = express.Router();
var controllers = require('../controllers');
var middleware = require('../middleware');
var multer = require('multer');

const upload = multer({
    dest: "./pics"
});

/* Route to create new crop */
router.post('/', upload.single("photo"), middleware.authorize.all, middleware.authorize.farmer, controllers.crop.create);

/* Route to get crop categories */
router.get('/category', middleware.authorize.all, middleware.authorize.wholesaler, controllers.crop.fetch.category);

// /* Route to get all crop details of a user */
// router.get('/', middleware.authorize.all, middleware.authorize.wholesaler, controllers.crop.fetch.details);

// /* Route to fetch crop names */
// router.get('/names', middleware.authorize.all, middleware.authorize.wholesaler, controllers.crop.fetch.names);

// /* Route to get specific crop of a user */
// router.get('/:cropId', middleware.authorize.all, middleware.authorize.farmer, controllers.crop.fetch.details);

// /* Route to get specific crop of a user */
// router.post('/:cropId/delete', middleware.authorize.all, middleware.authorize.farmer, controllers.crop.remove);

// /* Route to get crop photo */
// router.get('/:cropId/photo', middleware.authorize.all, middleware.authorize.farmer, controllers.crop.fetch.photo);

// /* Route to update crop photo */
// router.post('/:cropId/update/photo', upload.single("file"), middleware.authorize.all, middleware.authorize.farmer, controllers.crop.update.photo);

// /* Route to update crop details */
// router.post('/:cropId/update/details', middleware.authorize.all, middleware.authorize.farmer, controllers.crop.update.details);

// /* Route to fetch crop variety */
// router.get('/:cropName/variety', middleware.authorize.all, middleware.authorize.wholesaler, controllers.crop.fetch.variety);

// /* Route to fetch crop grade */
// router.get('/:cropName/:varietyName/grade', middleware.authorize.all, middleware.authorize.wholesaler, controllers.crop.fetch.grade);

// /* Route to fetch filtered crops */
// router.get('/:cropName/:varietyName/:gradeName', middleware.authorize.all, middleware.authorize.wholesaler, controllers.crop.fetch.filtered);

module.exports = router;