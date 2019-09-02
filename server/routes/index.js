var express = require('express');
var router = express.Router();

router.use('/', require('./home'));
router.use('/user', require('./user'));
router.use('/crop', require('./crop'));
router.use('/order', require('./order'));

module.exports = router;