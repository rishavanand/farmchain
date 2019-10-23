var express = require('express');
var router = express.Router();

router.use('/', require('./home'));
router.use('/user', require('./user'));
router.use('/crop', require('./crop'));
router.use('/product', require('./product'));
router.use('/order', require('./order'));
router.use('/stock', require('./stock'));
router.use('/clear', require('./clear'));

module.exports = router;