var express = require('express');
var router = express.Router();

router.use('/', require('./home'));
router.use('/user', require('./user'));

module.exports = router;